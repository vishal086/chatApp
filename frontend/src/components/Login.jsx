import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }
  return (
    <div className="min-w-96 mx-auto text-black">
      <div className='w-full p-6 rounded-lg shadow-md bg-violet-300 border border-white'>
        <h1 className='text-3xl text-black font-bold text-center'>Login</h1>
        <form onSubmit={onSubmitHandler} action="">

          <div>
            <label className='label p-2'>
              <span className='label-text text-black'>Username</span>
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
              <span className='text-black label-text'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input input-bordered h-10 bg-violet-200'
              type="password"
              placeholder='Password' />
          </div>
          <div>
            <button type="submit" className='btn bg-violet-600 btn-md btn-block mt-5 border-none hover:bg-violet-700 text-black'>Login</button>
          <p className='text-left my-2 text-black'>Don't have an account? <Link to="/signup"> signup </Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login