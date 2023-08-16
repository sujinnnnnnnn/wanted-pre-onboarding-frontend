import useInput from '../hooks/useInput';
import { Link } from 'react-router-dom';
export default function SignUpForm() {
  const { handleChangeEmail, handleChangePassword, handleSubmit, isVerified } =
    useInput();

  return (
    <>
      {' '}
      <form
        className="border-1 flex flex-col pt-20  gap-8"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between">
          <label htmlFor="email" className="font-semibold mr-1">
            이메일
          </label>
          <input
            type="text"
            id="email"
            data-testid="email-input"
            onChange={handleChangeEmail}
            className="border-2"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="pw" className="font-semibold mr-1">
            비밀번호
          </label>
          <input
            type="password"
            id="pw"
            data-testid="password-input"
            onChange={handleChangePassword}
            className="border-2"
          />
        </div>
        <button
          className={`${
            isVerified === true ? 'bg-slate-600' : 'bg-pink-400'
          } border-red-100 text-white rounded-sm`}
          data-testid="signup-button"
          disabled={isVerified}
        >
          회원가입
        </button>
      </form>
      <div className="mt-2 text-sm">
        이미 회원이신가요?{' '}
        <Link to="/signin" className="font-semibold">
          로그인하기
        </Link>
      </div>
    </>
  );
}
