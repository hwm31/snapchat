import React from "react";
import Link from 'next/link';

function ProfileScreen() {
  return (
    <div className="w-full h-full bg-gray-100 text-gray-800 flex flex-col items-center py-10">
      {/* Profile Card */}
      <div className="mt-8 bg-white w-96 rounded-xl shadow-lg p-6">
        {/* Profile Info */}
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-yellow-500"
          />
          <h2 className="text-lg font-semibold mt-4">Chaeun Shin</h2>
          <p className="text-sm text-gray-500">codns0929</p>
        </div>
        
        {/* Chat Prompt */}
        <div className="mt-4 bg-gradient-to-r from-gray-800 to-yellow-500 text-white text-center rounded-lg py-2">
          <p className="text-sm">친구와 채팅을 즐겨보세요</p>
          <Link href="/chat">
            <button className="mt-2 bg-blue-500 rounded-full px-6 py-2 text-sm">
              지금 채팅하기
            </button>
          </Link>
        </div>

        {/* Settings List */}
        <div className="mt-6">
          <ul className="space-y-2">
            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm">
              <span>비밀번호 변경</span>
              <span>&gt;</span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm text-red-500">
              <span>계정 삭제</span>
              <span>&gt;</span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm text-red-500">
              <span>로그아웃</span>
              <span>&gt;</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
