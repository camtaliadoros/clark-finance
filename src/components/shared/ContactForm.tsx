'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { SubmitHandler, useForm } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
};

type FieldId = 'message' | 'firstName' | 'lastName' | 'email' | 'phoneNumber';

interface InputField {
  id: FieldId;
  placeholder: string;
  type: string;
  requiredError?: string;
}

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const inputFields: InputField[] = [
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
      id: 'phoneNumber',
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

  const onSubmit: SubmitHandler<FormValues> = async (data, e) => {
    e?.preventDefault();

    setLoading(true);

    if (!executeRecaptcha) {
      console.log('Recaptcha not available');
      return;
    }

    const recapthaToken = await executeRecaptcha('submit_form');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/contact-us/api/create-lead`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, recapthaToken }),
      }
    );

    // review
    const resJson = await response.json();

    if (resJson.error) {
      setLoading(false);
      setSuccessMessage('');
      setError('Something went wrong, please try again!');
    } else {
      setError('');
      setSuccessMessage(
        "Thank you for getting in touch, we'll be in touch shortly!"
      );
      setLoading(false);
    }
  };

  return (
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
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
                {errors[field.id]?.message
                  ? String(errors[field.id]?.message)
                  : ''}
              </p>
            )}
          </div>
        ))}

        <button
          className='bg-mediumblue text-sm text-chalk hover:opacity-80 transition py-3 disabled:bg-mediumgrey'
          disabled={loading}
        >
          {loading ? <ClipLoader color='#F8F9FA' size={15} /> : 'Submit'}
        </button>
        {successMessage && (
          <p className='font-semibold text-sm text-green'>{successMessage}</p>
        )}
        {error && <p className='font-semibold text-sm text-red'>{error}</p>}
      </fieldset>
    </form>
  );
};
