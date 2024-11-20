'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ChatList {
  name: string;
  chat: string;
  chat_time: string;
}

export default function ChatPage() {
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .post('http://127.0.0.1:5000/chatlist', { cust_id: 1 })
      .then((response) => {
        const chatData = response.data.chat.map((_: any, index: number) => ({
          name: response.data.name[index],
          chat: response.data.chat[index],
          chat_time: response.data.chat_time[index],
        }));
        console.log('Formatted Data:', chatData);
        setChatList(chatData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">채팅 리스트</h1>
      <ul>
        {chatList.map((chat, index) => (
          <li
            key={index}
            className="border-b border-gray-700 py-4 flex justify-between"
          >
            <div>
              <p className="font-semibold">{chat.name}</p>
              <p className="text-gray-400">{chat.chat}</p>
            </div>
            <span className="text-sm text-gray-500">{chat.chat_time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}