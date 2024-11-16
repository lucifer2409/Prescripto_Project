import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { userData, setUserData, token, backendURL, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formdata = new FormData();
  
      formdata.append('name', userData.name || '');
      formdata.append('phone', userData.phone || '');
      formdata.append('address', userData.address || '');
      formdata.append('gender', userData.gender || '');
      formdata.append('dob', userData.dob || '');
      if (image) {
        formdata.append('image', image);
      }  
      const response = await fetch(`${backendURL}/api/user/update-profile`, {
        method: 'POST',
        headers: {
          token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formdata)),
      });
  
      const data = await response.json(); // Parse the response
  
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'An error occurred while updating the profile');
    }
  };
  

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
                className="w-36 rounded opacity-75"
              />
              {!image && (
                <img
                  src={assets.upload_icon}
                  alt="Upload Icon"
                  className="w-10 absolute bottom-12 right-12"
                />
              )}
            </div>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img src={userData.image || 'fallback_image_url'} alt="Profile" className="w-36 rounded" />
        )}

        {isEdit ? (
          <input
            value={userData.name || ''}
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name || 'Name not available'}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none" />

        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email Id :</p>
            <p className="text-blue-500">{userData.email || 'Email not available'}</p>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 max-w-52"
                value={userData.phone || ''}
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{userData.phone || 'Phone not available'}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.address || ''}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, address: e.target.value }))
                }
                className="bg-gray-50"
              />
            ) : (
              <p className="text-gray-500">{userData.address || 'Address not available'}</p>
            )}
          </div>
        </div>

        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender || ''}
                className="max-w-20 bg-gray-100"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender || 'Gender not specified'}</p>
            )}
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob || ''}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="max-w-28 bg-gray-100"
              />
            ) : (
              <p className="text-gray-400">{userData.dob || 'Date of birth not specified'}</p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="border border-primary px-8 py-2 rounded-full hover:text-white transition-all"
            >
              Save information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="border border-primary px-8 py-2 rounded-full hover:text-white transition-all"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;
