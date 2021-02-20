import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { map } from 'lodash';

import { ClearIcon, Select } from '@/shared/components/Element';
import { timeAgo, Button, Kind, RenderUserOption, RenderPriorityOption, TextArea } from '../shared';
import {
  selectTaskById,
  selectStatus,
  selectPriority,
  selectAssignee,
  setTaskTitle,
  setTaskDescription,
  setTaskStatus,
  setTaskPriority,
  setTaskAssignee,
} from '@/features/project/projectSlice';

export const TaskLink = styled(Link)`
  display: inline-flex;
`;

const TaskDetail = ({ taskId, modalClose }) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTaskById(taskId));
  const status = useSelector(selectStatus);
  const priority = useSelector(selectPriority);
  const assignee = useSelector(selectAssignee);

  const [taskCache, setTaskCache] = useState(task);

  const [dirty, setDirty] = useState(false);
  const [changeSet, setChangeSet] = useState([]);
  const addChangeFn = (fn) => {
    setChangeSet([...changeSet, fn]);
  };
  const cancel = () => {
    setChangeSet([]);
    setTaskCache(task);
    setDirty(false);
  };
  const submit = () => {
    changeSet.forEach((fn) => fn());
    modalClose();
  };
  return (
    <>
      <div className="flex items-center justify-between px-2 py-3 text-gray-500">
        <div className="flex items-center ml-2 text-sm">
          <Kind value={task.taskKindTitle} />
          <div>{`${task.taskKindTitle}-${taskId}`}</div>
        </div>
        <div className="flex items-center">
          {dirty ? (
            <>
              <Button className="mr-2" variant="text" color="light" onClick={cancel}>
                Cancel
              </Button>
              <Button className="mr-2" variant="contained" color="primary" onClick={submit}>
                Save
              </Button>
            </>
          ) : (
            ''
          )}
          <Button variant="text" color="light" onClick={modalClose} className="mr-2">
            <ClearIcon size={20} />
          </Button>
        </div>
      </div>
      <div className="bg-white px-4 pt-2 pb-4 text-gray-700">
        <div className="flex items-start justify-between">
          <div className="w-full mr-4">
            <h3 className="text-lg leading-6 font-medium">
              <TextArea
                value={taskCache.title}
                placeholder="Task name"
                onChange={(e) => {
                  // TODO: add input validate
                  setDirty(true);
                  setTaskCache({ ...taskCache, title: e.target.value });
                  addChangeFn(() =>
                    dispatch(setTaskTitle({ id: taskCache.id, title: e.target.value }))
                  );
                }}
              />
            </h3>
            <div className="py-2 text-sm">
              <TextArea
                // TODO: add input validate
                value={taskCache.description}
                placeholder="Task description"
                onChange={(e) => {
                  setDirty(true);
                  setTaskCache({ ...taskCache, description: e.target.value });
                  addChangeFn(() =>
                    dispatch(setTaskDescription({ id: taskCache.id, description: e.target.value }))
                  );
                }}
              />
            </div>
          </div>
          <div className="w-56">
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
                  setDirty(true);
                  setTaskCache({ ...taskCache, status: val });
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
                  setDirty(true);
                  setTaskCache({ ...taskCache, assignee: val });
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
                  setDirty(true);
                  setTaskCache({ ...taskCache, priority: val });
                  addChangeFn(() =>
                    dispatch(setTaskPriority({ id: taskCache.id, priority: parseInt(val) }))
                  );
                }}
                renderValue={({ value: priorityId }) => RenderPriorityOption(priority[priorityId])}
                renderOption={({ value: priorityId }) => RenderPriorityOption(priority[priorityId])}
              />
            </div>
            <div className="pt-3">
              <p className="text-gray-500 text-xs font-medium uppercase mr-2">Due date</p>
              <div className="text-sm">{task.due_date}</div>
            </div>
            <div className="pt-3 text-xs">Updated at {timeAgo(task.updated_at)} </div>
          </div>
        </div>
        <div className="placeholder pt-3 h-20"></div>
      </div>
    </>
  );
};
export default TaskDetail;
