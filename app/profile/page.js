'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function PersonalSettings() {
  const { register, handleSubmit, setValue } = useForm();
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('personalSettings');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.entries(parsedData).forEach(([key, value]) => setValue(key, value));
    }

    const savedImage = localStorage.getItem('profilePic');
    if (savedImage) {
      setProfilePic(savedImage);
    }
  }, [setValue]);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    localStorage.setItem('personalSettings', JSON.stringify(data));
  };

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    setProfilePic(imageURL); // Good for preview only — not persistent
  }
};
  return (
    <div className="min-h-screen bg-purple-50 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-md p-6 grid md:grid-cols-3 gap-6 max-w-5xl w-full"
      >
        {/* Profile Picture Column */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow">
            <img
              src={profilePic || '/default-avatar.png'}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <label className="text-sm text-pink-500 cursor-pointer">
            Change
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Personal Info Form */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <h2 className="col-span-2 text-xl font-semibold mb-2">Personal Settings</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input {...register('firstName')} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input {...register('lastName')} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input {...register('phone')} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input {...register('email')} type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input {...register('address')} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input {...register('city')} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input {...register('state')} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Postcode</label>
            <input {...register('postcode')} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input {...register('country')} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>

          <div className="col-span-2 flex justify-end mt-4">
            <button type="submit" className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
