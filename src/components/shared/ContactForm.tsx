'use client';

import { useReCaptcha } from 'next-recaptcha-v3';
import { useForm } from 'react-hook-form';

type ContactFormContent = {
  title: string;
};

export const ContactForm = ({ title }: ContactFormContent) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { executeRecaptcha } = useReCaptcha();

  const inputFields = [
    {
      id: 'firstName',
      requiredError: 'This field is required.',
      placeholder: 'First Name',
      type: 'text',
    },
    {
      id: 'lastName',
      requiredError: 'This field is required.',
      placeholder: 'Last Name',
      type: 'text',
    },
    {
      id: 'email',
      requiredError: 'Please enter a valid email address.',
      placeholder: 'Email Address',
      type: 'email',
    },
    {
      id: 'phoneNumer',
      requiredError: 'This field is required.',
      placeholder: 'Phone Number',
      type: 'tel',
    },
    {
      id: 'message',
      placeholder: 'Message',
      type: 'textarea',
    },
  ];

  return (
    <div className='w-2/3'>
      <h3 className='text-2xl text-ash mb-8'>{title}</h3>
      <form
        onSubmit={handleSubmit(async (data) => {
          const token = await executeRecaptcha('form_submit');
        })}
        className='w-3/5'
      >
        <fieldset className='flex flex-col space-y-4  *:placeholder:text-mediumgrey *:placeholder:text-sm'>
          {inputFields.map((field) => (
            <div key={field.id} className='flex flex-col'>
              <input
                {...register(field.id, { required: field.requiredError })}
                placeholder={field.placeholder}
                type={field.type}
                className='p-3'
              />
              {errors[field.id] && (
                <p className='text-sm text-red pt-1'>
                  {errors[field.id]?.message}
                </p>
              )}
            </div>
          ))}

          <button className='bg-mediumblue text-sm text-chalk hover:opacity-80 transition py-3 '>
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};
