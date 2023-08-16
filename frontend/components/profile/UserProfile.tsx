import { useSession } from 'next-auth/react';

import { object, string, mixed, InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { AiOutlineCamera } from 'react-icons/ai';

const UserProfile = () => {
  const { data: session } = useSession();

  const userSchema = object().shape({
    name: string().required('Name is required'),
    email: string().email('Email is invalid').required('Email is required'),
    phoneNumber: string()
      .matches(/^[0-9]{10,11}$|^$/gm, 'Phone number is invalid')
      .nullable()
      .notRequired(),
    avatar: mixed().nullable().notRequired(),
  });

  type UserFormType = InferType<typeof userSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    setValue,
    getValues,
  } = useForm<UserFormType>({
    defaultValues: {
      name: session?.user.name,
      email: session?.user.email,
      phoneNumber: session?.user.phoneNumber || '-none-',
      avatar: null,
    },
    resolver: yupResolver<UserFormType>(userSchema),
  });

  const onSubmit = (data: UserFormType) => {
    console.log(data);
  };

  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="relative mb-8">
          <img
            src={`${session?.user.avatar.url || '/imgs/user.png'}`}
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
            alt=""
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="image"
              className="hidden"
              {...register('avatar')}
            />
            <label htmlFor="image" className="cursor-pointer">
              <AiOutlineCamera />
            </label>
          </div>
        </div>
      </div>

      <div className="w-full px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid gap-6 800px:grid-cols-2">
            <div className="">
              <label className="block pb-2">Your Name</label>
              <input type="text" className="input" {...register('name')} />
              <span className="text-red-500 text-sm">
                {errors.name && errors.name.message}
              </span>
            </div>

            <div className="">
              <label className="block pb-2">Your Email</label>
              <input type="text" className="input" {...register('email')} />
              <span className="text-red-500 text-sm">
                {errors.email && errors.email.message}
              </span>
            </div>

            <div className="">
              <label className="block pb-2">Your Phone</label>
              <input
                type="text"
                className="input"
                {...register('phoneNumber')}
              />
              <span className="text-red-500 text-sm">
                {errors.phoneNumber && errors.phoneNumber.message}
              </span>
            </div>
          </div>

          <input
            className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
            required
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
