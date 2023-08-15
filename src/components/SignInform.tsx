import React from 'react';
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
    <div>
      로그인
      <form className="border-1" onSubmit={handleSignInSubmit}>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          data-testid="email-input"
          onChange={handleChangeEmail}
        />
        <label htmlFor="pw">비밀번호</label>
        <input
          type="password"
          id="pw"
          data-testid="password-input"
          onChange={handleChangePassword}
        />

        <button
          className={`${
            isVerified === true ? 'bg-slate-600' : 'bg-pink-400'
          } border-red-100`}
          data-testid="signup-button"
          disabled={isVerified}
        >
          로그인
        </button>
      </form>
    </div>
  );
}
