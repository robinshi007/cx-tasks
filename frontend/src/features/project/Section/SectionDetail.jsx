import React from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

import { ClearIcon } from '@/shared/components/Element';
import { Button, TextArea, FormSubmit, ErrorMessage, defaultSection } from '@/features/shared';
import { selectSectionById } from '@/features/project/projectSlice';
import { setSectionNew, setSection } from '@/features/entity';

const SectionDetail = ({ id, modalClose }) => {
  const isAddMode = !id;
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const section = useSelector(selectSectionById(id));

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
    if (isAddMode) {
      dispatch(setSectionNew({ id: '0', section: { ...defaultSection(), ...data } }));
    } else {
      dispatch(setSection({ id, section: data }));
    }
    modalClose && modalClose();

    if (isAddMode) {
      toast.success('New section is created.');
    } else {
      toast.success(`Section ${id} is updated.`);
    }
  };

  // const [section, setSection] = useState({});
  // useEffect(() => {
  //   if (!isAddMode) {
  //     // call fetch api here
  //   }
  // }, []);

  return (
    <>
      {section ? (
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
                  defaultValue={section.title}
                  control={control}
                  render={({ ref, ...props }, { invalid, isDirty }) => (
                    <TextArea ref={ref} placeholder="Title" isError={errors.title} {...props} />
                  )}
                />
                <ErrorMessage field={errors.title} />
              </div>
              <div className="flex-col items-center">
                <Controller
                  name="description"
                  defaultValue={section.description}
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
              <div className="last:pt-1">
                <FormSubmit
                  type="submit"
                  color="primary"
                  disabled={isValid && isDirty ? false : true}
                />
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

export default SectionDetail;
