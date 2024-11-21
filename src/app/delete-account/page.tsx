'use client';

import React, { useState } from "react";

export default function DeleteAccountScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmText, setConfirmText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 검증 로직
    if (username !== "codns0929" || password !== "password123") {
      setError("계정 이름 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    if (confirmText !== "DELETE") {
      setError("확인 텍스트가 올바르지 않습니다. 'DELETE'를 입력하세요.");
      return;
    }

    // 계정 삭제 로직 (API 호출)
    alert("계정이 삭제되었습니다.");
    setUsername("");
    setPassword("");
    setConfirmText("");
    setError("");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-red-500">계정 삭제</h1>
        <p className="text-gray-600 mb-6">
          계정을 삭제하려면 아래에 계정 이름, 비밀번호, 그리고 <b>'DELETE'</b>를 입력하세요.
          삭제하면 복구할 수 없습니다.
        </p>
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">계정 이름</label>
            <input
              type="text"
              placeholder="계정 이름"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              확인 텍스트 (DELETE 입력)
            </label>
            <input
              type="text"
              placeholder="DELETE"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            계정 삭제
          </button>
        </form>
      </div>
    </div>
  );
}

