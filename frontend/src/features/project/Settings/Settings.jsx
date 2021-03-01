import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//import {  merge } from 'lodash';

import { ClearIcon } from '@/shared/components/Element';
import { TextArea, Button, ErrorMessage, FormSubmit, defaultProject } from '@/features/shared';
import { setProject, setProjectNew, putProjectThunk, putNewProjectThunk } from '@/features/entity';
import { selectProjectById } from '@/features/project/projectSlice';

const Settings = ({ id, modalClose }) => {
  const isAddMode = !id;
  const project = useSelector(selectProjectById(id));
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    title: yup.string().trim('').required().max(128),
    description: yup.string().trim('').max(512),
  });
  const { handleSubmit, errors, control, setValue, formState } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const { isValid, isDirty } = formState;

  const handleSubmitFn = (data) => {
    if (isAddMode) {
      const newProject = { ...defaultProject(), ...data };
      dispatch(setProjectNew({ id: newProject.id, project: { ...newProject, ...data } }));
      dispatch(putNewProjectThunk(newProject));
    } else {
      const updateProject = { ...project, ...data };
      dispatch(setProject({ id: id, project: updateProject }));
      dispatch(putProjectThunk(updateProject));
    }
    modalClose && modalClose();
  };

  useEffect(() => {
    if (project) {
      setValue('title', project.title);
      setValue('description', project.description);
    }
  }, [project, setValue]);

  return (
    <div className="px-8 py-4 flex items-center justify-between text-sm ">
      <div className="w-full">
        <div className="flex items-center justify-between h-11 w-full">
          <h2 className="text-gray-600 font-medium text-lg">
            {id ? 'Project settings' : 'New project'}
          </h2>

          {isAddMode && (
            <div className="flex items-center">
              <Button variant="text" color="light" onClick={modalClose} className="">
                <ClearIcon size={20} />
              </Button>
            </div>
          )}
        </div>
        <div className="h-36 w-full py-2">
          <div className="w-96">
            <form onSubmit={handleSubmit(handleSubmitFn)}>
              <div>
                <Controller
                  name="title"
                  defaultValue={(project && project.title) || ''}
                  control={control}
                  render={({ ref, ...props }, { invalid, isDirty }) => (
                    <TextArea ref={ref} placeholder="Title" isError={errors.title} {...props} />
                  )}
                />
                <ErrorMessage field={errors.title} />
              </div>
              <div>
                <Controller
                  name="description"
                  defaultValue={(project && project.description) || ''}
                  control={control}
                  render={({ ref, ...props }, { invalid, isDirty }) => (
                    <TextArea
                      ref={ref}
                      isMulti={true}
                      placeholder="Description"
                      isError={errors.description}
                      {...props}
                    />
                  )}
                />
                <ErrorMessage field={errors.description} />
              </div>
              <div className="last:pt-2">
                <FormSubmit
                  type="submit"
                  color="primary"
                  disabled={isValid && isDirty ? false : true}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
