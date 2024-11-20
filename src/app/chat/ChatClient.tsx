'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';

interface Chat {
  id: number;
  message: string;
  roomId: string;
}

const ChatClient: React.FC = () => {
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/chats')
      .then((response) => {
        setChats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching chats:', error);
        setLoading(false);
      });
  }, []);

  const navigateToChatRoom = (roomId: string) => {
    router.push(`/chat/${roomId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-yellow-400 text-black px-4 py-3">
        <h1 className="text-2xl font-bold">채팅</h1>
      </header>

      <ul className="flex-grow overflow-y-auto">
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => navigateToChatRoom(chat.roomId)}
          >
            <Image
              src={`/images/user-${chat.id}.png`}
              alt={`${chat.id} avatar`}
              width={48}
              height={48}
              className="rounded-full mr-4"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{`Room ${chat.roomId}`}</h2>
              <p className="text-sm text-gray-400 truncate">{chat.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatClient;