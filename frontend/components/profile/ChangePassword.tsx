import React, { useState } from 'react';

import { object, string, mixed, InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const changePasswordSchema = object().shape({
    oldPassword: string().required('Old password is required'),
    newPassword: string().required('New password is required'),
    confirmPassword: string().required('Confirm password is required'),
  });

  type ChangePasswordFormType = InferType<typeof changePasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    setValue,
    getValues,
  } = useForm<ChangePasswordFormType>({
    defaultValues: {},
    resolver: yupResolver<ChangePasswordFormType>(changePasswordSchema),
  });

  const passwordChangeHandler = (data: ChangePasswordFormType) => {
    const { confirmPassword, newPassword, oldPassword } = data;

    if (newPassword === oldPassword) {
      setError('newPassword', {
        type: 'custom',
        message: 'The new password must not be the same as the old password',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('confirmPassword', {
        type: 'custom',
        message: 'Confirmation password is not correct',
      });
      return;
    }

    console.log(data);
  };

  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={handleSubmit(passwordChangeHandler)}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Old password</label>
            <input
              type="password"
              className="input !w-[95%] mb-4 800px:mb-0"
              {...register('oldPassword')}
            />
            <span className="text-red-500 text-sm">
              {errors.oldPassword && errors.oldPassword.message}
            </span>
          </div>

          <div className=" w-[100%] 800px:w-[50%] my-6">
            <label className="block pb-2">New password</label>
            <input
              type="password"
              className="input !w-[95%] mb-4 800px:mb-0"
              {...register('newPassword')}
            />
            <span className="text-red-500 text-sm">
              {errors.newPassword && errors.newPassword.message}
            </span>
          </div>

          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Confirm password</label>
            <input
              type="password"
              className="input !w-[95%] mb-4 800px:mb-0"
              {...register('confirmPassword')}
            />
            <span className="text-red-500 text-sm">
              {errors.confirmPassword && errors.confirmPassword.message}
            </span>
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
