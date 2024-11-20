'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const ChatRoom: React.FC = () => {
  const params = useParams();
  const { roomId } = params;

  return (
    <div>
      <h1>{`채팅방: ${roomId}`}</h1>
    </div>
  );
};

export default ChatRoom;