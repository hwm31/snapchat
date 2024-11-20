"use client"; // 클라이언트 컴포넌트임을 명시

import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // 이메일 상태
  const [password, setPassword] = useState<string>(''); // 비밀번호 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력하세요.');
      return;
    }

    setLoading(true); // 로딩 시작
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('회원가입 성공!');
        window.location.href = '/login'; // 회원가입 후 로그인 페이지로 이동
      } else {
        const error = await response.json();
        alert(`회원가입 실패: ${error.message}`);
      }
    } catch (error) {
      console.error('서버 오류:', error);
      alert('서버 오류가 발생했습니다.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold text-yellow-500 mb-6">회원가입</h1>
      <form onSubmit={handleRegister} className="w-80 bg-white p-6 rounded-lg shadow-md">
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
          className={`w-full py-2 rounded-md text-white transition-all ${
            loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
          }`}
          disabled={loading}
        >
          {loading ? '회원가입 중...' : '회원가입'}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        이미 계정이 있으신가요?{' '}
        <a href="/login" className="text-yellow-500 hover:underline">
          로그인
        </a>
      </p>
    </div>
  );
};

export default RegisterPage;
