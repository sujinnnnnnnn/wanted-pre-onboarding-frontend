import { useEffect } from 'react';
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
  return (
    <div className="bg-white rounded-md  h-[100%] w-[50vw] p-5 flex flex-col justify-start pt-10 items-center">
      <h1 className="text-3xl font-semibold">회원가입</h1>
      <SignUpForm />
    </div>
  );
}
