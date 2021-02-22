import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map } from 'lodash';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { ClearIcon, DeleteIcon, Select } from '@/shared/components/Element';
import { timeAgo, Button, Kind, RenderUserOption, RenderPriorityOption, TextArea } from '../shared';
import {
  selectTaskById,
  selectStatus,
  selectPriority,
  selectAssignee,
  selectSection,
  setTaskNew,
  setTaskTitle,
  setTaskDescription,
  setTaskStatus,
  setTaskPriority,
  setTaskAssignee,
  setTaskSection,
  setTaskDuedate,
  deleteTask,
} from '@/features/project/projectSlice';

const TaskDetail = ({ taskId, modalClose, fields }) => {
  const dispatch = useDispatch();
  // useSelector must be called in this level, will seperate for new task later
  let task = useSelector(selectTaskById(taskId, { status: fields && parseInt(fields.status) }));
  //let task = useSelector(selectTaskById(taskId, {}));
  const status = useSelector(selectStatus);
  const priority = useSelector(selectPriority);
  const assignee = useSelector(selectAssignee);
  const section = useSelector(selectSection);

  const [taskCache, setTaskCache] = useState(task);

  const [dirty, setDirty] = useState(false);
  const [changeSet, setChangeSet] = useState([]);
  const addChangeFn = (fn) => {
    if (changeSet.length === 0 && taskCache.id === 0) {
      dispatch(setTaskNew({ id: taskCache.id.toString(), task }));
    }
    setChangeSet([...changeSet, fn]);
  };
  const cancel = () => {
    setChangeSet([]);
    setTaskCache(task);
    setDirty(false);
    validate();
  };
  const submit = () => {
    changeSet.forEach((fn) => fn());
    modalClose();
  };
  const validateTitle = (e) => {
    const titleSchema = yup.string().required().max(128);
    const val = e ? e.target.value : taskCache.title;
    titleSchema.validate(val).catch((err) => {
      if (err.errors.length > 0) {
        setTitleError(err.errors[0]);
      }
    });
  };
  const validateDesc = (e) => {
    const descSchema = yup.string().max(1024);
    const val = e ? e.target.value : taskCache.description;
    descSchema.validate(val).catch((err) => {
      if (err.errors.length > 0) {
        setDescError(err.errors[0]);
      }
    });
  };
  const validate = () => {
    validateTitle();
    validateDesc();
  };

  const [titleError, setTitleError] = useState('');
  const [descError, setDescError] = useState('');
  return (
    <>
      <div className="flex items-center justify-between px-2 py-3 text-gray-500">
        <div className="flex items-center ml-2 text-sm">
          <Kind value={taskCache.taskKindTitle} />
          <div>
            {taskId === 'new'
              ? `${taskCache.taskKindTitle} New`
              : `${taskCache.taskKindTitle}-${taskId}`}
          </div>
        </div>
        <div className="flex items-center">
          {dirty ? (
            <>
              <Button className="mr-2" variant="text" color="light" onClick={cancel}>
                Cancel
              </Button>
              <Button
                className="mr-2"
                variant="contained"
                color="primary"
                onClick={submit}
                disabled={titleError !== '' || descError !== '' ? true : false}
              >
                Save
              </Button>
            </>
          ) : (
            ''
          )}
          {taskId === 'new' ? (
            ''
          ) : (
            <Button
              className="mr-2"
              variant="text"
              color="danger"
              onClick={() => {
                dispatch(deleteTask({ id: taskCache.id }));
                modalClose();
              }}
            >
              <DeleteIcon size={20} />
            </Button>
          )}
          <Button variant="text" color="light" onClick={modalClose} className="mr-2">
            <ClearIcon size={20} />
          </Button>
        </div>
      </div>
      <div className="bg-white px-4 pt-2 pb-4 text-gray-700">
        <div className="flex items-start justify-between">
          <div className="w-full mr-4">
            <h3 className="text-lg leading-5 font-medium">
              <TextArea
                rows={1}
                value={taskCache.title}
                placeholder="Task name"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // prevent "enter" key for title field
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  // TODO: add input validate
                  !dirty && setDirty(true);
                  setTitleError('');
                  setTaskCache({ ...taskCache, title: e.target.value });
                  validateTitle(e);
                }}
                onBlur={() => {
                  if (titleError === '') {
                    addChangeFn(() =>
                      dispatch(setTaskTitle({ id: taskCache.id, title: taskCache.title }))
                    );
                  }
                }}
              />
            </h3>
            <div className="text-xs text-red-500">{titleError}</div>
            <div className="py-2 text-sm">
              <TextArea
                rows={1}
                value={taskCache.description}
                placeholder="Task description"
                onChange={(e) => {
                  // TODO: add input validate
                  !dirty && setDirty(true);
                  setDescError('');
                  setTaskCache({ ...taskCache, description: e.target.value });
                  validateDesc(e);
                }}
                onBlur={() => {
                  if (descError === '') {
                    addChangeFn(() =>
                      dispatch(
                        setTaskDescription({ id: taskCache.id, description: taskCache.description })
                      )
                    );
                  }
                }}
              />
            </div>
          </div>
          <div className="w-96">
            <div className="">
              <p className="text-gray-500 text-xs font-medium uppercase mr-2">status</p>
              <Select
                variant="empty"
                placeholder="None"
                dropdownWidth={120}
                withClearValue={false}
                withSearch={false}
                name="status"
                value={taskCache.status.toString()}
                options={map(status, (val, key) => ({
                  value: key,
                  label: val.title,
                }))}
                onChange={(val) => {
                  !dirty && setDirty(true);
                  setTaskCache({ ...taskCache, status: val });
                  validate();
                  addChangeFn(() =>
                    dispatch(setTaskStatus({ id: taskCache.id, status: parseInt(val) }))
                  );
                }}
              />
            </div>
            <div className="pt-3">
              <p className="text-gray-500 text-xs font-medium uppercase mr-2">assignee</p>
              <Select
                variant="empty"
                placeholder="Unassigned"
                dropdownWidth={120}
                withClearValue={false}
                withSearch={false}
                name="assignee"
                value={taskCache.assignee && taskCache.assignee.toString()}
                options={map(assignee, (val, key) => ({
                  value: key,
                  label: val.name,
                }))}
                onChange={(val) => {
                  !dirty && setDirty(true);
                  setTaskCache({ ...taskCache, assignee: val });
                  validate();
                  addChangeFn(() =>
                    dispatch(setTaskAssignee({ id: taskCache.id, assignee: parseInt(val) }))
                  );
                }}
                renderValue={({ value: assigneeId }) => RenderUserOption(assignee[assigneeId])}
                renderOption={({ value: assigneeId }) => RenderUserOption(assignee[assigneeId])}
              />
            </div>
            <div className="pt-3">
              <p className="text-gray-500 text-xs font-medium uppercase mr-2">priority</p>
              <Select
                variant="empty"
                placeholder="None"
                dropdownWidth={120}
                withClearValue={false}
                withSearch={false}
                name="priority"
                value={taskCache.priority && taskCache.priority.toString()}
                options={map(priority, (val, key) => ({
                  value: key,
                  label: val.title,
                }))}
                onChange={(val) => {
                  !dirty && setDirty(true);
                  setTaskCache({ ...taskCache, priority: val });
                  validate();
                  addChangeFn(() =>
                    dispatch(setTaskPriority({ id: taskCache.id, priority: parseInt(val) }))
                  );
                }}
                renderValue={({ value: priorityId }) => RenderPriorityOption(priority[priorityId])}
                renderOption={({ value: priorityId }) => RenderPriorityOption(priority[priorityId])}
              />
            </div>
            <div className="pt-3">
              <p className="text-gray-500 text-xs font-medium uppercase mr-2">section</p>
              <Select
                variant="empty"
                placeholder="None"
                dropdownWidth={120}
                withClearValue={false}
                withSearch={false}
                name="section"
                value={taskCache.section && taskCache.section.toString()}
                options={map(section, (val, key) => ({
                  value: key,
                  label: val.title,
                }))}
                onChange={(val) => {
                  !dirty && setDirty(true);
                  setTaskCache({ ...taskCache, section: val });
                  validate();
                  addChangeFn(() =>
                    dispatch(setTaskSection({ id: taskCache.id, section: parseInt(val) }))
                  );
                }}
              />
            </div>
            <div className="pt-3">
              <p className="text-gray-500 text-xs font-medium uppercase mr-2">Due date</p>
              <div className="text-sm">
                <DatePicker
                  className="w-32 bg-gray-200 text-gray-600 px-4 py-1.5 rounded"
                  selected={Date.parse(taskCache.due_date)}
                  dateFormat="yyyy/MM/dd"
                  onChange={(date) => {
                    !dirty && setDirty(true);
                    setTaskCache({ ...taskCache, due_date: date });
                    validate();
                    addChangeFn(() =>
                      dispatch(setTaskDuedate({ id: taskCache.id, due_date: date.toISOString() }))
                    );
                  }}
                />
              </div>
            </div>
            <div className="pt-3 text-xs">Updated at {timeAgo(taskCache.updated_at)} </div>
          </div>
        </div>
        <div className="placeholder pt-3 h-20"></div>
      </div>
    </>
  );
};
export default TaskDetail;
