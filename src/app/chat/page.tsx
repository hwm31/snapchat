'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ChatRoom = {
  name: string;
  chat: string;
  chat_time: string;
  member_cnt?: number;
  chat_cnt: number;
  room_photos?: string;
};

const ChatView = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showHeartedOnly, setShowHeartedOnly] = useState(false);
  const router = useRouter();

  const API_BASE_URL = 'http://127.0.0.1:5000';
  
  const getImagePaths = (imageNames: string): string[] => {
    // 쉼표로 구분된 이미지들을 배열로 변환하고 각각의 경로 설정
    return imageNames.split(',').map(img => {
      const trimmedImg = img.trim();
      if (trimmedImg.startsWith('images_')) {
        return `/image/profile/${trimmedImg}`;
      } else if (trimmedImg.startsWith('cimages_')) {
        return `/image/chat/${trimmedImg}`;
      }
      return '/api/placeholder/48/48';
    });
  };

  // 이미지 그리드 레이아웃 컴포넌트
  const RoomImages = ({ images }: { images: string[] }) => {
    const imageCount = images.length;
    
    if (imageCount === 0) return null;
    
    // 이미지가 1개일 때
    if (imageCount === 1) {
      return (
        <div className="w-full h-full">
          <img
            src={images[0]}
            alt="Room"
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/api/placeholder/48/48";
            }}
          />
        </div>
      );
    }
    
    // 이미지가 2개일 때
    if (imageCount === 2) {
      return (
        <div className="w-full h-full grid grid-cols-2 gap-0.5">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Room ${idx + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/api/placeholder/48/48";
              }}
            />
          ))}
        </div>
      );
    }
    
    // 이미지가 3개일 때
    if (imageCount === 3) {
      return (
        <div className="w-full h-full grid grid-cols-2 gap-0.5">
          <img
            src={images[0]}
            alt="Room 1"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/api/placeholder/48/48";
            }}
          />
          <div className="grid grid-rows-2 gap-0.5">
            {images.slice(1).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Room ${idx + 2}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/api/placeholder/48/48";
                }}
              />
            ))}
          </div>
        </div>
      );
    }
  };

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: false
  });

  const fetchChatRooms = async (heartedOnly = false) => {
    setLoading(true);
    try {
      const endpoint = heartedOnly ? '/hearted-chatlist' : '/chatlist';
      const response = await axiosInstance.post(endpoint, {
        user_id: 1,
      });

      if (!response.data ||
          !Array.isArray(response.data.room_name) ||
          !Array.isArray(response.data.chat) ||
          !Array.isArray(response.data.chat_time) ||
          !Array.isArray(response.data.room_photos)) {
        throw new Error('Invalid response format');
      }

      const minLength = Math.min(
        response.data.room_name.length,
        response.data.chat.length,
        response.data.chat_time.length,
        response.data.member_cnt?.length || Infinity,
        response.data.chat_cnt?.length || Infinity,
        response.data.room_photos?.length || Infinity
      );

      const chatData = Array.from({ length: minLength }, (_, index) => ({
        name: response.data.room_name[index] || 'Unknown',
        chat: response.data.chat[index] || 'No message',
        chat_time: response.data.chat_time[index] || 'Unknown time',
        member_cnt: response.data.member_cnt?.[index],
        chat_cnt: response.data.chat_cnt?.[index],
        room_photos: response.data.room_photos?.[index]
      }));

      setChatRooms(chatData);
    } catch (err) {
      console.error('Error fetching chat rooms:', err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(`Server Error: ${err.response.data.message || 'Unknown error'}`);
        } else if (err.request) {
          setError('No response from server. Please check if the server is running.');
        } else {
          setError(`Request Error: ${err.message}`);
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleHeartedFilter = () => {
    setShowHeartedOnly(!showHeartedOnly);
    fetchChatRooms(!showHeartedOnly);
  };

  useEffect(() => {
    fetchChatRooms(showHeartedOnly);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            {showHeartedOnly ? '❤️ Chat List' : 'Chat List'}
          </h1>
          <button
            onClick={handleHeartedFilter}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
          >
            <Heart
              className={`${showHeartedOnly ? 'fill-red-500 text-red-500' : 'text-gray-400'} transition-all duration-300`}
              size={20}
            />
            <span className="text-white">
              {showHeartedOnly ? 'Show All' : 'Hearted Only'}
            </span>
          </button>
        </div>
      </div>

      <div className="w-full">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-gray-400">
            Loading...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64 text-red-500">
            {error}
          </div>
        ) : chatRooms.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-500">
            {showHeartedOnly ? 'No hearted chats available' : 'No chats available'}
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {chatRooms.map((room, index) => (
              <div
                key={index}
                className="p-4 hover:bg-gray-900/50 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
                      {room.room_photos ? (
                        <RoomImages images={getImagePaths(room.room_photos)} />
                      ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">
                            {room.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">{room.name}</span>
                        <span className="text-sm text-gray-400">
                          {room.member_cnt ?? 0}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm truncate">{room.chat}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {room.chat_time}
                    </span>
                    {room.chat_cnt && room.chat_cnt > 0 && (
                      <span className="mt-1 text-sm px-2 py-0.5 bg-red-500/20 rounded-full text-red-500">
                        {room.chat_cnt}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatView;