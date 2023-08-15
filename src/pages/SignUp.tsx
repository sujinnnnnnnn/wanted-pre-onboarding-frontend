import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../api/auth/Token';
import SignUpForm from '../components/SignUpForm';

export default function SignUp() {
  const navigate = useNavigate();
  useEffect(() => {
    if (getToken()) {
      navigate('/todo');
    }
  }, []);
  return <SignUpForm />;
}
