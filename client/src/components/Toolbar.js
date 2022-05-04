import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Toolbar = () => {
  const [me, setMe] = useContext(AuthContext);
  const logoutHandler = async () => {
    try {
      await axios.patch('http://localhost:5000/users/logout');
      toast.success('로그아웃되었습니다.');
      setMe();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Link to=''>홈</Link>
      {me ? (
        <>
          <button type='button' onClick={logoutHandler}>
            로그아웃({me.name})
          </button>
        </>
      ) : (
        <>
          <Link to='auth/login'>로그인</Link>
          <Link to='auth/register'>회원가입</Link>
        </>
      )}
    </>
  );
};

export default Toolbar;
