import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      alert(`로그인 성공! 이메일: ${email}`);
      // 로그인 처리 로직 추가
    } else {
      alert('이메일과 비밀번호를 입력하세요.');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold text-yellow-500 mb-6">로그인</h1>
      <form onSubmit={handleLogin} className="w-80 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition-all"
        >
          로그인
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        계정이 없으신가요?{' '}
        <Link to="/register" className="text-yellow-500 hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default Login;