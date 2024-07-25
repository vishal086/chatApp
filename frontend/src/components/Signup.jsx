import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '..';
const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user);
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
    })
  }
  return (
    <div className="min-w-96 mx-auto text-black">
      <div className='w-full p-6 rounded-lg shadow-md bg-violet-300 border border-white'>
        <h1 className='text-3xl font-bold text-center'>Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full input input-bordered h-10 bg-violet-200'
              type="text"
              placeholder='Full Name' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full input input-bordered h-10 bg-violet-200'
              type="text"
              placeholder='Username' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input input-bordered h-10 bg-violet-200'
              type="password"
              placeholder='Password' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full input input-bordered h-10 bg-violet-200'
              type="password"
              placeholder='Confirm Password' />
          </div>
         

          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p>Male</p>
              <input
                type="radio"
                value=""
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="mx-2  w-4 h-4 bg-gray-100 border-gray-300 hover:cursor-pointer" />
            </div>
            <div className='flex items-center'>
              <p>Female</p>
              <input
                type="radio"
                value=""
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="mx-2  w-4 h-4 bg-gray-100 border-gray-300 hover:cursor-pointer" />
            </div>
          </div>

          <div>
            <button type='submit' className='btn bg-violet-600 btn-md btn-block mt-5 border-none hover:bg-violet-700 text-black'>Singup</button>
          <p className='text-left my-2'>Already have an account? <Link to="/login"> login </Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup