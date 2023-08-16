import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendData, signin, signup } from '../api/auth/Login';
import { setToken } from '../api/auth/Token';

export default function useInput() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const isVerified = isEmail === false || isPassword === false;
  const navigate = useNavigate();
  const handleChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const emailCurrent = event.target.value;
      setEmail(emailCurrent);

      if (!emailCurrent.includes('@')) {
        setIsEmail(false);
      } else {
        setIsEmail(true);
      }
    },
    []
  );
  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const passwordCurrent = event.target.value;
      setPassword(passwordCurrent);

      if (passwordCurrent.length < 8) {
        setIsPassword(false);
      } else {
        setIsPassword(true);
      }
    },
    []
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isVerified) {
    } else {
      try {
        const res = await signup({ email, password });
        if (res.status === 201) {
          alert('회원가입 성공');
          navigate('/signin');
        }
      } catch (err: any) {
        const { message } = err.response.data;
        alert(message);
      }
    }
  };
  const handleSignInSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (isVerified) {
    } else {
      try {
        const res = await signin({ email, password });
        if (res.status === 200) {
          setToken(res.data.access_token);
          alert('로그인 되었습니다.');
          navigate('/todo');
        }
      } catch (err: any) {
        alert('로그인에 실패하였습니다');
      }
    }
  };
  return {
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
    isVerified,
    handleSignInSubmit,
  };
}
