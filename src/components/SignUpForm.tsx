import React from 'react';
import useInput from '../hooks/useInput';

export default function SignUpForm() {
  const { handleChangeEmail, handleChangePassword, handleSubmit, isVerified } =
    useInput();

  return (
    <form className="border-1" onSubmit={handleSubmit}>
      <h1>회원가입</h1>
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
        회원가입
      </button>
    </form>
  );
}
