import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ClearIcon } from '@/shared/components/Element';
import { Button, Input, FormSubmit, ErrorMessage, defaultSection } from '../shared';
import { setSectionNew } from '@/features/project/projectSlice';

const SectionDetail = ({ id, modalClose }) => {
  const isAddMode = !id;
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    title: yup.string().required().max(128),
    description: yup.string().max(512),
  });
  //const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, errors, control, formState } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const { isValid } = formState;
  const handleSubmitFn = (data) => {
    //console.log(data);
    dispatch(setSectionNew({ id: '0', section: { ...defaultSection(), ...data } }));
    modalClose();
  };
  return (
    <>
      <div className="flex items-center justify-between px-2 py-3 text-gray-600">
        <div className="flex items-center font-medium ml-2 text-base">
          <div>{isAddMode ? `New section` : `Section-${id}`}</div>
        </div>
        <div className="flex items-center">
          <Button variant="text" color="light" onClick={modalClose} className="">
            <ClearIcon size={20} />
          </Button>
        </div>
      </div>
      <div className="bg-white px-4 pt-2 pb-4 text-gray-700">
        <form className="" onSubmit={handleSubmit(handleSubmitFn)}>
          <div className="flex-col items-center">
            <Controller
              name="title"
              defaultValue=""
              control={control}
              render={({ ref, ...props }, { invalid, isDirty }) => (
                <Input ref={ref} placeholder="Title" {...props} />
              )}
            />
            <ErrorMessage field={errors.title} />
          </div>
          <div className="flex-col items-center">
            <Controller
              name="description"
              defaultValue=""
              control={control}
              render={({ ref, ...props }, { invalid, isDirty }) => (
                <Input ref={ref} isMulti={true} placeholder="Description" {...props} />
              )}
            />
            <ErrorMessage field={errors.description} />
          </div>
          <div className="last:pt-1">
            <FormSubmit type="submit" color="primary" disabled={isValid ? false : true} />
          </div>
        </form>
      </div>
    </>
  );
};

export default SectionDetail;
