'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ChatList {
  name: string;
  chat: string;
  chat_time: string;
}

export default function HeartedChatPage() {
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHeartedChats = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/hearted-chatlist', {
          user_id: 1
        });
        console.log('API Response:', response.data);

        // API 응답 구조 검증
        if (!response.data || 
            !Array.isArray(response.data.room_name) || 
            !Array.isArray(response.data.chat) || 
            !Array.isArray(response.data.chat_time)) {
          throw new Error('Invalid response format');
        }

        // 배열 길이 확인
        const minLength = Math.min(
          response.data.room_name.length,
          response.data.chat.length,
          response.data.chat_time.length
        );

        const chatData = Array.from({ length: minLength }, (_, index) => ({
          name: response.data.room_name[index] || 'Unknown',
          chat: response.data.chat[index] || 'No message',
          chat_time: response.data.chat_time[index] || 'Unknown time'
        }));

        console.log('Formatted Data:', chatData);
        setChatList(chatData);
      } catch (err) {
        console.error('API Error:', err);
        if (axios.isAxiosError(err)) {
          if (err.response) {
            console.error('Error response:', err.response.data);
            setError(`서버 오류: ${err.response.data.error || '알 수 없는 오류가 발생했습니다'}`);
          } else if (err.request) {
            setError('서버에서 응답이 없습니다. 서버가 실행 중인지 확인해주세요.');
          } else {
            setError(`요청 오류: ${err.message}`);
          }
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHeartedChats();
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
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <p className="text-sm">콘솔에서 자세한 오류 내용을 확인할 수 있습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">❤️ Hearted Chat List</h1>
      {chatList.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          하트 표시된 채팅방이 없습니다
        </div>
      ) : (
        <ul>
          {chatList.map((chat, index) => (
            <li
              key={index}
              className="border-b border-gray-700 py-4 flex justify-between hover:bg-gray-900 transition-colors duration-200 cursor-pointer"
            >
              <div>
                <p className="font-semibold">{chat.name}</p>
                <p className="text-gray-400">{chat.chat}</p>
              </div>
              <span className="text-sm text-gray-500">{chat.chat_time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}