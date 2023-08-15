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
    <div>
      <SignInform />
    </div>
  );
}
