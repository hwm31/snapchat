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
      setError("The account name or password is incorrect.");
      return;
    }

    if (confirmText !== "DELETE") {
      setError("The confirmation text is incorrect. Please type ‘DELETE’.");
      return;
    }

    // 계정 삭제 로직 (API 호출)
    alert("The account has been deleted.");
    setUsername("");
    setPassword("");
    setConfirmText("");
    setError("");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Delete account</h1>
        <p className="text-gray-600 mb-6">
        To delete your account, please enter your account name, password, and <b>'DELETE'</b> below.
        Once deleted, it cannot be recovered.
        </p>
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Account name</label>
            <input
              type="text"
              placeholder="Account name"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
            Confirmation text (type DELETE)
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
            Delete account
          </button>
        </form>
      </div>
    </div>
  );
}

