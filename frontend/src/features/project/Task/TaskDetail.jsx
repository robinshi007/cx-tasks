import React from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { map, merge } from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { ClearIcon, Select } from '@/shared/components/Element';
import {
  timeAgo,
  Button,
  Kind,
  RenderUserOption,
  RenderProjectOption,
  RenderPriorityOption,
  TextArea,
  FormSubmit,
  ErrorMessage,
} from '@/features/shared';
import {
  selectTaskById,
  selectStatuses,
  selectPriorities,
  selectAssignees,
  selectSections,
} from '@/features/project/projectSlice';
import {
  selectProjects,
  setTask,
  setTaskNew,
  putTaskThunk,
  putNewTaskThunk,
} from '@/features/entity';

const TaskDetail = ({ id, modalClose, fields }) => {
  const isAddMode = !id;
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  // useSelector must be called in this level, will seperate for new task later
  let task = useSelector(
    selectTaskById(id, {
      status: fields && fields.status,
      section: fields && fields.section,
      project: fields && fields.project,
    })
  );
  const statuses = useSelector(selectStatuses);
  const priorities = useSelector(selectPriorities);
  const assignees = useSelector(selectAssignees);
  const sections = useSelector(selectSections);
  const projects = useSelector(selectProjects);
  // schema
  var validationSchema = yup.object().shape({
    title: yup.string().required().max(256),
    description: yup.string().max(1024),
    project: yup.string().required(),
    section: yup.string(),
    assignee: yup.string(),
    status: yup.string().required(),
    priority: yup.string().required(),
    due_date: yup.string(),
  });

  const { handleSubmit, errors, control, reset, formState } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const { isDirty, isValid } = formState;

  const handleSubmitFn = (data) => {
    if (data.due_date.length === 13) {
      data.due_date = new Date(parseInt(data.due_date)).toISOString();
    } else if (data.due_date === 'NaN') {
      data.due_date = '';
    }
    console.log('data', data);
    let newTask = merge(task, data);
    if (isAddMode) {
      dispatch(setTaskNew({ id: newTask.id, task: newTask }));
      dispatch(putTaskThunk(newTask));
    } else {
      dispatch(setTask({ id: newTask.id, task: newTask }));
      dispatch(putNewTaskThunk(newTask));
    }
    modalClose && modalClose();
  };

  return (
    <>
      {task ? (
        <>
          <div className="flex items-center justify-between px-2 py-3 text-gray-500">
            <div className="flex items-center ml-2 text-sm">
              <Kind value={task.typeTitle} />
              <div>{isAddMode ? `${task.typeTitle} New` : `${task.typeTitle}-${id}`}</div>
            </div>
            <div className="flex items-center">
              <Button variant="text" color="light" onClick={modalClose} className="mr-2">
                <ClearIcon size={20} />
              </Button>
            </div>
          </div>
          <div className="bg-white px-4 pt-2 pb-2 text-gray-700">
            <form
              className="flex items-start justify-between"
              onSubmit={handleSubmit(handleSubmitFn)}
            >
              <div className="mr-4 w-full">
                <div className="">
                  <Controller
                    name="title"
                    defaultValue={task.title}
                    control={control}
                    render={({ ref, ...props }) => (
                      <TextArea
                        ref={ref}
                        isBgWhite={true}
                        placeholder="Task name"
                        className="text-lg font-medium"
                        isError={errors.title}
                        {...props}
                      />
                    )}
                  />
                </div>
                <ErrorMessage field={errors.title} />
                <div className="">
                  <Controller
                    name="description"
                    defaultValue={task.description}
                    control={control}
                    render={({ ref, ...props }) => (
                      <TextArea
                        ref={ref}
                        isMulti={true}
                        isBgWhite={true}
                        placeholder="Task description"
                        className="text-xs"
                        isHeading={true}
                        isError={errors.description}
                        {...props}
                      />
                    )}
                  />
                  <ErrorMessage field={errors.description} />
                </div>
              </div>
              <div className="" style={{ width: '240px' }}>
                <div className="">
                  <p className="text-gray-500 text-xs font-medium uppercase mr-2">project</p>
                  <Controller
                    name="project"
                    defaultValue={task.project}
                    control={control}
                    render={({ ref, ...props }) => (
                      <Select
                        ref={ref}
                        variant="empty"
                        placeholder="None"
                        withClearValue={false}
                        withSearch={false}
                        options={map(projects, (val, key) => ({
                          value: key,
                          label: val.title,
                        }))}
                        renderValue={({ value: id }) => RenderProjectOption(projects[id])}
                        renderOption={({ value: id }) => RenderProjectOption(projects[id])}
                        {...props}
                        style={{}}
                      />
                    )}
                  />
                </div>
                <div className="pt-3">
                  <p className="text-gray-500 text-xs font-medium uppercase mr-2">status</p>
                  <Controller
                    name="status"
                    defaultValue={task.status}
                    control={control}
                    render={({ ref, ...props }) => (
                      <Select
                        ref={ref}
                        dropdownWidth={130}
                        variant="empty"
                        placeholder="None"
                        withClearValue={false}
                        withSearch={false}
                        options={map(statuses, (val, key) => ({
                          value: key,
                          label: val.title,
                        }))}
                        {...props}
                      />
                    )}
                  />
                </div>
                <div className="pt-3">
                  <p className="text-gray-500 text-xs font-medium uppercase mr-2">assignee</p>
                  <Controller
                    name="assignee"
                    defaultValue={task.assignee && task.assignee.toString()}
                    control={control}
                    render={({ ref, ...props }) => (
                      <Select
                        ref={ref}
                        variant="empty"
                        dropdownWidth={130}
                        placeholder="Unassigned"
                        withClearValue={false}
                        withSearch={false}
                        options={map(assignees, (val, key) => ({
                          value: key,
                          label: val.name,
                        }))}
                        renderValue={({ value: assigneeId }) =>
                          RenderUserOption(assignees[assigneeId])
                        }
                        renderOption={({ value: assigneeId }) =>
                          RenderUserOption(assignees[assigneeId])
                        }
                        {...props}
                      />
                    )}
                  />
                </div>
                <div className="pt-3">
                  <p className="text-gray-500 text-xs font-medium uppercase mr-2">priority</p>
                  <Controller
                    name="priority"
                    defaultValue={task.priority && task.priority}
                    control={control}
                    render={({ ref, ...props }) => (
                      <Select
                        ref={ref}
                        variant="empty"
                        dropdownWidth={130}
                        placeholder="None"
                        withClearValue={false}
                        withSearch={false}
                        options={map(priorities, (val, key) => ({
                          value: key,
                          label: val.title,
                        }))}
                        renderValue={({ value: priorityId }) =>
                          RenderPriorityOption(priorities[priorityId])
                        }
                        renderOption={({ value: priorityId }) =>
                          RenderPriorityOption(priorities[priorityId])
                        }
                        {...props}
                      />
                    )}
                  />
                </div>
                <div className="pt-3">
                  <p className="text-gray-500 text-xs font-medium uppercase mr-2">section</p>
                  <Controller
                    name="section"
                    defaultValue={task.section && task.section}
                    control={control}
                    render={({ ref, ...props }) => (
                      <Select
                        ref={ref}
                        variant="empty"
                        placeholder="None"
                        dropdownWidth={130}
                        withClearValue={false}
                        withSearch={false}
                        options={map(sections, (val, key) => ({
                          value: key,
                          label: val.title,
                        }))}
                        {...props}
                      />
                    )}
                  />
                </div>
                <div className="pt-3">
                  <p className="text-gray-500 text-xs font-medium uppercase mr-2">Due date</p>
                  <div className="text-sm">
                    <Controller
                      name="due_date"
                      defaultValue={Date.parse(task.due_date)}
                      control={control}
                      render={({ value, ...props }) => (
                        <DatePicker
                          className="w-32 bg-gray-200 text-gray-600 px-4 py-1.5 rounded"
                          selected={value}
                          dateFormat="yyyy/MM/dd"
                          {...props}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="pt-3 text-xs">Updated at {timeAgo(task.updated_at)} </div>
                <div className="placeholder pt-3 h-20">
                  {isDirty ? (
                    <div className="flex items-center pt-2">
                      <Button
                        className="mr-2"
                        variant="text"
                        color="light"
                        onClick={() => {
                          reset();
                        }}
                      >
                        Cancel
                      </Button>
                      <FormSubmit
                        type="submit"
                        color="primary"
                        disabled={isValid && isDirty ? false : true}
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <Redirect to={{ pathname: '/not_found', state: { path: url } }} />
      )}
    </>
  );
};
export default TaskDetail;
