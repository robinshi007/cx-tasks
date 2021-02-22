import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Input, ErrorMessage, FormSubmit } from '../shared';
import { setProject, selectProjectById } from '@/features/project/projectSlice';

const Settings = () => {
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    title: yup.string().required().max(128),
    description: yup.string().max(512),
  });
  const { handleSubmit, errors, control, formState } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const { isValid, isDirty } = formState;
  const handleSubmitFn = (data) => {
    //console.log(data);
    dispatch(setProject({ id: '0', project: { ...data } }));
  };

  // data
  let project = useSelector(selectProjectById);
  // const fields = ['title', 'description'];
  // fields.forEach((field) => setValue(field, project[field]));
  return (
    <div className="px-8 py-4 flex items-center justify-between text-sm ">
      <div className="w-full">
        <div className="flex items-center justify-start h-11 w-full">
          <h2 className="text-gray-600 font-medium text-lg">Settings</h2>
        </div>
        <div className="h-36 w-full py-2">
          <div className="w-96">
            <form onSubmit={handleSubmit(handleSubmitFn)}>
              <div>
                <Controller
                  name="title"
                  defaultValue={project.title}
                  control={control}
                  render={({ ref, ...props }, { invalid, isDirty }) => (
                    <Input ref={ref} placeholder="Title" {...props} />
                  )}
                />
                <ErrorMessage field={errors.title} />
              </div>
              <div>
                <Controller
                  name="description"
                  defaultValue={project.description}
                  control={control}
                  render={({ ref, ...props }, { invalid, isDirty }) => (
                    <Input ref={ref} isMulti={true} placeholder="Description" {...props} />
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
