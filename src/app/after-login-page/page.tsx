"use client";

import React, { useState } from "react";
import { Search, Cake, UserPlus } from "lucide-react";

const AfterLoginPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [friends] = useState([
    { id: 1, name: "김범수", birthday: "08-02", isBirthday: false },
    { id: 2, name: "박재환", birthday: "11-29", isBirthday: false },
    { id: 3, name: "손인화", birthday: "11-27", isBirthday: true },
    { id: 4, name: "신승민", birthday: "11-26", isBirthday: false },
    { id: 5, name: "신채운", birthday: "06-21", isBirthday: false },
    { id: 6, name: "이한용", birthday: "10-18", isBirthday: false },
    { id: 7, name: "이현우", birthday: "12-10", isBirthday: false },
    { id: 8, name: "이희승", birthday: "11-02", isBirthday: false },
    { id: 9, name: "임윤승", birthday: "01-13", isBirthday: false },
  ]);

  const [recommendedFriends] = useState([
    { id: 10, name: "추천친구1", reason: "공통 관심사" },
    { id: 11, name: "추천친구2", reason: "같은 지역 거주" },
    { id: 12, name: "추천친구3", reason: "같은 학교 출신" },
  ]);

  // 검색어를 기반으로 친구 필터링
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 오늘 생일인 친구만 필터링
  const birthdayFriends = friends.filter((friend) => friend.isBirthday);

  return (
    <div className="max-w-md mx-auto bg-yellow-50 min-h-screen p-4">
      {/* 상단 환영 메시지 */}
      <div className="bg-yellow-200 rounded-lg p-4 mb-4 shadow-md">
        <h1 className="text-xl font-bold">안녕하세요, 조풍진님! 👋</h1>
        <p className="text-sm text-gray-600">마지막 접속: 2024. 11. 22.</p>
      </div>

      {/* 검색창 */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
        <div className="relative">
          <input
            type="text"
            placeholder="친구 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* 오늘 생일인 친구 섹션 */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
        <div className="flex items-center mb-3">
          <Cake className="text-pink-500 mr-2" size={24} />
          <h2 className="text-lg font-bold text-gray-800">오늘 생일인 친구</h2>
        </div>
        {birthdayFriends.length > 0 ? (
          <div className="space-y-2">
            {birthdayFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-2 bg-pink-50 rounded-lg"
              >
                <span>{friend.name}</span>
                <button className="text-pink-500 hover:text-pink-600 font-semibold">
                  🎂 축하하기
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">오늘 생일인 친구가 없습니다.</p>
        )}
      </div>

      {/* 추천 친구 섹션 */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
        <div className="flex items-center mb-3">
          <UserPlus className="text-blue-500 mr-2" size={24} />
          <h2 className="text-lg font-bold text-gray-800">추천 친구</h2>
        </div>
        {recommendedFriends.length > 0 ? (
          <div className="space-y-2">
            {recommendedFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <div>
                  <span className="block font-semibold">{friend.name}</span>
                  <span className="text-sm text-gray-500">
                    {friend.reason}
                  </span>
                </div>
                <button className="text-blue-500 hover:text-blue-600 font-semibold">
                  추가
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">추천할 친구가 없습니다.</p>
        )}
      </div>

      {/* 친구 목록 */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800">친구 목록</h2>
        </div>
        <div className="space-y-2">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <span>{friend.name}</span>
                {friend.isBirthday && <span className="text-pink-500">🎂</span>}
              </div>
            ))
          ) : (
            <p className="text-gray-600">검색된 친구가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AfterLoginPage;
