import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setSocketConnection, setUser, setOnlineUser } from '../redux/userSlice';
import Sidebar from '../components/Sidebar';
import io from 'socket.io-client';
import logo from '../assets/logo.png';

const Home = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true
      });

      dispatch(setUser(response.data.data));
      if (response.data.data.logout) {
        dispatch(logout());
        navigate('/email');
      }

      console.log("current user details", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    socketConnection.on('onlineUser', (data) => {
      console.log(data);
      dispatch(setOnlineUser(data));
    });

    dispatch(setSocketConnection(socketConnection));

    
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const basePath = location.pathname === '/';
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && 'hidden'} lg:block`}>
        <Sidebar />
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>
      {basePath && (
        <div className='lg:flex justify-center items-center flex-col gap-2 hidden'>
          <div>
            <img
              src={logo}
              width={260}
              alt='logo'
            />
          </div>
          <p className='text-lg mt-2 text-slate-500'>Select user to send the message</p>
        </div>
      )}
    </div>
  );
};

export default Home;
