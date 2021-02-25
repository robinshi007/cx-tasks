import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { loginAsyncAction, selectAuth } from '@/features/auth/authSlice';
import { FormSubmit, Input, ErrorMessage } from '@/features/shared';
import logoTextImage from '@/assets/logo_text.png';

const Login = () => {
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required(),
  });

  const { error, isLoading } = useSelector(selectAuth);

  const { handleSubmit, errors, control } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const handleSubmitFn = (data) => {
    dispatch(loginAsyncAction(data));
  };
  return (
    <div className="flex flex-col min-h-screen justify-between items-center bg-blue-700">
      <div className="flex-initial h-px"></div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center items-center h-28 -ml-4">
          <img className="object-cover" src={logoTextImage} alt="logo" />
        </div>
        <form
          className="bg-white text-center rounded py-6 px-8 shadow"
          style={{ width: '350px' }}
          onSubmit={handleSubmit(handleSubmitFn)}
        >
          <h1 className="text-lg text-gray-600 text-semibold mb-4">Log in to CxTasks</h1>
          <ErrorMessage field={error} className="pb-1" />
          <div className="">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({ ref, ...props }) => (
                <Input
                  id="name"
                  ref={ref}
                  placeholder="User name"
                  isError={errors.name}
                  {...props}
                />
              )}
            />
            <ErrorMessage field={errors.name} className="pb-1" />
          </div>
          <div className="">
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <Controller
              name="password"
              defaultValue=""
              control={control}
              render={({ ref, ...props }) => (
                <Input
                  id="password"
                  ref={ref}
                  type="password"
                  placeholder="Password"
                  isError={errors.password}
                  {...props}
                />
              )}
            />
            <ErrorMessage field={errors.password} className="pb-1" />
          </div>
          <div className="last:pt-1">
            <FormSubmit
              type="submit"
              disabled={isLoading ? true : false}
              color="primary"
              value="Login"
              className="w-full"
            />
          </div>
          <div className="text-blue-600 text-sm pt-6">
            <a className="hover:underline hover:text-blue-500" href="/">
              Cann't log in?
            </a>
            <div className="inline-block mx-1">
              <svg height="16" width="16" className="fill-current text-gray-300">
                <circle cx="8" cy="11" r="2" stroke="black" strokeWidth="0" />
              </svg>
            </div>
            <a className="hover:underline hover:text-blue-500" href="/">
              Sign up for the account
            </a>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center text-white text-sm h-16">
        <a className="hover:underline" href="/">
          Privacy policy
        </a>
        <div className="inline-block mx-1">
          <svg height="20" width="16" className="fill-current text-gray-100">
            <circle cx="8" cy="11" r="2" stroke="black" strokeWidth="0" />
          </svg>
        </div>
        <a className="hover:underline" href="/">
          Term of use
        </a>
      </div>
    </div>
  );
};
export default Login;
