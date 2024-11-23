import React from "react";
import Link from "next/link";

const ProfileScreen: React.FC = () => {
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
          <h2 className="text-lg font-semibold mt-4">Poongjin Jo</h2>
          <p className="text-sm text-gray-500">poongjin@gachon.ac.kr</p>
        </div>

        {/* Chat Prompt */}
        <div className="mt-4 bg-gradient-to-r from-gray-800 to-yellow-500 text-white text-center rounded-lg py-2">
          <p className="text-sm">Enjoy chatting with friends!</p>
          <Link href="/chat">
            <button className="mt-2 bg-blue-500 rounded-full px-6 py-2 text-sm">
              Chat now
            </button>
          </Link>
        </div>

        {/* Settings List */}
        <div className="mt-6">
          <ul className="space-y-2">
            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm">
              <Link href="/change-password" className="flex-grow">
                Change Password
              </Link>
              <span>&gt;</span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm text-red-500">
  <Link href="/delete-account" className="flex-grow">
    Delete Account
  </Link>
  <span>&gt;</span>
</li>

            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm text-red-500">
              <span>Logout</span>
              <span>&gt;</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;

