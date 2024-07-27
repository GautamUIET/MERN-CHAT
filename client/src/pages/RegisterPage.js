import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  });

  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);

    setIsUploading(true);
    const uploadResult = await uploadFile(file);
    setIsUploading(false);

    setData((prev) => ({
      ...prev,
      profile_pic: uploadResult?.url
    }));
  };

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);

    setData((prev) => ({
      ...prev,
      profile_pic: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!data.profile_pic) {
      toast.error("Please upload a profile picture.");
      return;
    }


    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;
   
  try {
    const response = await axios.post(URL, data);
    console.log("response", response);

    toast.success(response.data.message);

    if (response.data.success) {
      setData({
        name: "",
        email: "",
        password: "",
        profile_pic: ""
      });

      navigate('/email');
    }
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.log("error response", error.response.data);
      toast.error(error.response.data.message);
    } else if (error.request) {
      // Request was made but no response received
      console.log("error request", error.request);
      toast.error("Network error. Please try again.");
    } else {
      // Something happened in setting up the request
      console.log("error message", error.message);
      toast.error("An unexpected error occurred.");
    }
  }
  console.log('data', data);
};

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <h3>Welcome to the Chat app!</h3>
        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Enter your name'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='profile_pic'>Photo:
              <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary'>
                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                  {uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"}
                </p>
                {isUploading && <p className='text-sm text-primary'>Uploading...</p>}
                {uploadPhoto?.name && <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                  <IoClose />
                </button>}
              </div>
            </label>
            <input
              type='file'
              id='profile_pic'
              name='profile_pic'
              className='bg-slate-100 px-2 py-1 focus:outline-primary hidden cursor-pointer'
              onChange={handleUploadPhoto}
              required
            />
          </div>
          <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>
            Register
          </button>
        </form>
        <p className='my-3 text-center'>Already have an account? <Link to={"/email"} className='hover:text-primary font-semibold'>Login</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
