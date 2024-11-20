"use client"; // 클라이언트 컴포넌트임을 명시

import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // 이메일 상태
  const [password, setPassword] = useState<string>(''); // 비밀번호 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력하세요.');
      return;
    }

    setLoading(true); // 로딩 시작
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('로그인 성공!');
        window.location.href = '/home'; // 로그인 성공 후 홈 페이지로 이동
      } else {
        const error = await response.json();
        alert(`로그인 실패: ${error.message}`);
      }
    } catch (error) {
      console.error('서버 오류:', error);
      alert('서버 오류가 발생했습니다.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-green-600 mb-6">로그인</h1>
      <form onSubmit={handleLogin} className="w-80 bg-white p-6 rounded-md shadow-md">
        <div className="mb-4">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-400 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 ${
            loading ? 'opacity-50' : ''
          }`}
          disabled={loading}
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        계정이 없으신가요?{' '}
        <a href="/register" className="text-green-500 hover:underline">
          회원가입
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
