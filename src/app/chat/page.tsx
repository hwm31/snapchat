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
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/chatlist', { 
          user_id: 1 
        });
        
        console.log('API Response:', response.data); // 전체 응답 데이터 확인

        if (!response.data || !response.data.chat) {
          throw new Error('Invalid response format');
        }

        const chatData = response.data.chat.map((_: any, index: number) => ({
          name: response.data.name[index],
          chat: response.data.chat[index],
          chat_time: response.data.chat_time[index],
        }));

        console.log('Formatted Data:', chatData);
        setChatList(chatData);
      } catch (err) {
        console.error('API Error:', err);
        if (axios.isAxiosError(err)) {
          if (err.response) {
            // 서버가 응답을 반환한 경우
            console.error('Error response:', err.response.data);
            setError(`서버 오류: ${err.response.data.error || '알 수 없는 오류가 발생했습니다'}`);
          } else if (err.request) {
            // 요청은 보냈지만 응답을 받지 못한 경우
            setError('서버에서 응답이 없습니다. 서버가 실행 중인지 확인해주세요.');
          } else {
            // 요청 설정 중에 문제가 발생한 경우
            setError(`요청 오류: ${err.message}`);
          }
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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