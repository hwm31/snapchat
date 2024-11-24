"use client"; // 클라이언트 컴포넌트임을 명시

import React, { useState } from "react";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // 이메일 상태
  const [password, setPassword] = useState<string>(""); // 비밀번호 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true); // 로딩 시작
    try {
      // API 요청 생략 (테스트용)
      alert("Sign-up successful!"); 
      window.location.href = "/after-login-page"; // 회원가입 후 친구 관리 페이지로 이동
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("Sign-up failed!");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-extrabold text-yellow-600 mb-6">Sign up</h1>
      <form
        onSubmit={handleRegister}
        className="w-80 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-yellow-300 rounded-md focus:ring-yellow-400 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-yellow-300 rounded-md focus:ring-yellow-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 rounded-md text-white font-bold transition-all ${
            loading
              ? "bg-gray-400"
              : "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700"
          }`}
          disabled={loading}
        >
          {loading ? "Signing up…" : "Sign up"}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-700">
      Already have an account?{" "}
        <a href="/login" className="text-yellow-600 hover:underline font-medium">
          Login
        </a>
      </p>
    </div>
  );
};

export default RegisterPage;
