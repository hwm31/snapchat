'use client';

import React, { useState } from "react";

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("The new passwords do not match.");
      return;
    }
    // 비밀번호 변경 로직 추가 (예: API 호출)
    alert("Your password has been successfully changed.");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4">Change password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Current password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">New password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Confirm new password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Change password
          </button>
        </form>
      </div>
    </div>
  );
}
