import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../api/auth/Token';
import SignInform from '../components/SignInform';

export default function SignIn() {
  const navigate = useNavigate();
  useEffect(() => {
    if (getToken()) {
      navigate('/todo');
    }
  }, []);
  return (
    <div className="bg-white rounded-md h-[100%] w-[50vw] flex flex-col p-5 justify-start pt-10 items-center">
      <h1 className="text-2xl font-semibold">로그인</h1>
      <SignInform />
    </div>
  );
}
