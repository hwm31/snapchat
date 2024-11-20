'use client';

import React, { useState } from 'react';

interface Chat {
  id: number;
  message: string;
  roomId: string;
}

const ChatScreen: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, message: '안녕하세요!', roomId: '1' },
  ]);

  // 상태를 업데이트하는 함수 추가
  const addChat = () => {
    setChats((prevChats) => [
      ...prevChats,
      { id: prevChats.length + 1, message: '새로운 메시지!', roomId: '2' },
    ]);
  };

  return (
    <div>
      <h1>채팅 화면</h1>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>{chat.message}</li>
        ))}
      </ul>
      <button onClick={addChat}>채팅 추가</button>
    </div>
  );
};

export default ChatScreen;