import React, { useState } from 'react';
import { object, string, mixed, InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { AiOutlineDelete } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { Country, State } from 'country-state-city';

const Address = () => {
  const [open, setOpen] = useState(false);

  const addressTypeData = [
    {
      name: 'Default',
    },
    {
      name: 'Home',
    },
    {
      name: 'Office',
    },
  ];

  const addressSchema = object().shape({
    country: string().required('Country is required'),
    city: string().required('City is required'),
    address1: string().required('Address1 is required'),
    address2: string().nullable().notRequired(),
    zipcode: string().required('Zipcode is required'),
    addressType: string().required('Zipcode is required'),
  });

  type AddressFormType = InferType<typeof addressSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    setValue,
    getValues,
  } = useForm<AddressFormType>({
    defaultValues: {},
    resolver: yupResolver<AddressFormType>(addressSchema),
  });

  const onSubmit = (data: AddressFormType) => {
    console.log(data);
  };

  const handleDelete = () => {};

  const country = watch('country');

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[95%] 800px:w-[50%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2 mb-4">
                    <label className="font-bold block pb-2">Country</label>
                    <select
                      className="w-full border h-[40px] rounded-[5px]"
                      {...register('country')}
                    >
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                    <span className="text-sm text-red-500">
                      {errors.country && errors.country.message}
                    </span>
                  </div>

                  <div className="w-full pb-2 mb-4">
                    <label className="font-bold block pb-2">
                      Choose your City
                    </label>
                    <select
                      className="w-full border h-[40px] rounded-[5px]"
                      {...register('city')}
                    >
                      {State &&
                        State.getStatesOfCountry(country || 'AF').map(
                          (item) => (
                            <option className="block pb-2" key={item.isoCode}>
                              {item.name}
                            </option>
                          )
                        )}
                    </select>
                    <span className="text-sm text-red-500">
                      {errors.city && errors.city.message}
                    </span>
                  </div>

                  <div className="w-full pb-2 mb-4">
                    <label className="font-bold block pb-2">Address 1</label>
                    <input
                      type="tetx"
                      className="input"
                      {...register('address1')}
                    />
                    <span className="text-sm text-red-500">
                      {errors.address1 && errors.address1.message}
                    </span>
                  </div>

                  <div className="w-full pb-2 mb-4">
                    <label className="font-bold block pb-2">Address 2</label>
                    <input
                      type="address"
                      className="input"
                      {...register('address2')}
                    />
                  </div>

                  <div className="w-full pb-2 mb-4">
                    <label className="font-bold block pb-2">Zip Code</label>
                    <input
                      type="text"
                      className="input"
                      {...register('zipcode')}
                    />
                    <span className="text-sm text-red-500">
                      {errors.zipcode && errors.zipcode.message}
                    </span>
                  </div>

                  <div className="w-full pb-2 mb-4">
                    <label className="font-bold block pb-2">Address Type</label>
                    <select
                      className="w-full border h-[40px] rounded-[5px]"
                      {...register('addressType')}
                    >
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                    <span className="text-sm text-red-500">
                      {errors.addressType && errors.addressType.message}
                    </span>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className="input mt-5 cursor-pointer"
                      required
                      readOnly
                      value="Submit"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div className="btn !rounded-md" onClick={() => setOpen(true)}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />

      {/* {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )} */}
    </div>
  );
};

export default Address;
