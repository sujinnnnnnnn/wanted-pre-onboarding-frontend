import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, sendData } from '../api/auth/Login';
import { setToken } from '../api/auth/Token';
// 유효성 검증
export default function useInput() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const isVerified = isEmail === false || isPassword === false;
  const navigate = useNavigate();
  const handleChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = event.target.value;
      setEmail(emailCurrent);

      if (!emailCurrent.includes('@')) {
        setIsEmail(false);
        console.log('dd');
      } else {
        setIsEmail(true);
      }
    },
    []
  );
  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /^.{8,}$/;
      const passwordCurrent = event.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setIsPassword(false);
      } else {
        setIsPassword(true);
      }
    },
    []
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEmail === false || isPassword === false) {
    } else {
      sendData('auth/signup', 'post', { email, password })
        .then(() => {
          alert('회원가입 되었습니다.');
          navigate('/signin');
        })
        .catch((error) => {
          console.log(error);
          setIsEmail(false);
          alert('회원가입에 실패하였습니다');
        });
    }
  };
  const handleSignInSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (isEmail === false || isPassword === false) {
    } else {
      sendData('auth/signin', 'post', { email, password })
        .then((res) => {
          console.log(res);
          setToken(res.access_token);
          alert('로그인 되었습니다.');
          navigate('/todo');
        })
        .catch((error) => {
          console.log(error);
          setIsPassword(false);
          alert('로그인에 실패하였습니다');
        });
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
