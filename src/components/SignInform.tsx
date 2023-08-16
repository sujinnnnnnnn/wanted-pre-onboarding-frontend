import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
// 로그인 하면 토큰 얻기
export default function SignInform() {
  const {
    handleChangeEmail,
    handleChangePassword,
    handleSignInSubmit,
    isVerified,
  } = useInput();

  return (
    <>
      <form
        className="border-1 flex flex-col pt-20  gap-8"
        onSubmit={handleSignInSubmit}
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
        <div></div>
        <div>
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
          } border-red-100 text-white`}
          data-testid="signup-button"
          disabled={isVerified}
        >
          로그인
        </button>
      </form>
      <div className="mt-2 text-sm">
        회원이 아니신가요?{' '}
        <Link to="/signup" className="font-semibold">
          회원가입 하러가기
        </Link>
      </div>
    </>
  );
}
