"use client";
import React, { useState, useEffect } from "react";
import { Search, Cake, Users } from "lucide-react";

const AfterLoginPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [friends, setFriends] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<{
    toMe: any[];
    popular: any[];
  }>({ toMe: [], popular: [] }); // 추천 친구 상태
  const [userName, setUserName] = useState<string>("사용자");
  const [userProfilePicture, setUserProfilePicture] = useState<string>("default-profile.png");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/after-login-page", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: 1, cnt_limit: 3 }), // 사용자 ID와 추천 친구 수 제한 전송
        });

        const data = await response.json();
        if (data.error) {
          console.error("API Error:", data.error);
          return;
        }

        // 상태 업데이트
        setUserName(data.userName || "사용자");
        setUserProfilePicture(
          `/image/profile/${data.userProfilePicture || "default-profile.png"}`
        );
        setFriends(
          data.friends.map((friend: any) => ({
            id: friend.user_id,
            name: friend.name,
            birthday: friend.birthday,
            isBirthday: friend.is_birthday,
            profilePicture: `/image/profile/${friend.profile_picture || "default-profile.png"}`,
          }))
        );
        setRecommendations({
          toMe: data.recommendations.to_me.map((rec: any) => ({
            name: rec.name,
            url: rec.url.startsWith("/image/profile/") 
              ? rec.url // 이미 경로가 보정된 경우 그대로 사용
              : `/image/profile/${rec.url}`, // 경로 보정
          })),
          popular: data.recommendations.popular.map((rec: any) => ({
            name: rec.name,
            url: rec.url.startsWith("/image/profile/") 
              ? rec.url // 이미 경로가 보정된 경우 그대로 사용
              : `/image/profile/${rec.url}`, // 경로 보정
          })),
        });
        
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const birthdayFriends = friends.filter((friend) => friend.isBirthday);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-yellow-50 min-h-screen p-4">
      {/* 상단 프로필 정보 */}
      <div className="bg-yellow-200 rounded-lg p-4 mb-4 shadow-md flex items-center">
        <img
          src={userProfilePicture}
          alt={`${userName}의 프로필`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h1 className="text-xl font-bold">안녕하세요, {userName}님! 👋</h1>
        </div>
      </div>

      {/* 검색창 */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow-md relative">
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
          <Search className="text-gray-400" size={20} />
        </div>
        <input
          type="text"
          placeholder="친구 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-14 pr-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* 추천 친구 섹션 */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
        <div className="flex items-center mb-3">
          <Users className="text-blue-500 mr-2" size={24} />
          <h2 className="text-lg font-bold text-gray-800">추천 친구</h2>
        </div>
        <h3 className="font-bold text-gray-700 mb-2">나를 추가한 친구</h3>
        {recommendations.toMe.length > 0 ? (
          recommendations.toMe.map((recommend, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <img
                  src={recommend.url}
                  alt={recommend.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-semibold">{recommend.name}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">추천할 친구가 없습니다.</p>
        )}

        <h3 className="font-bold text-gray-700 mb-2 mt-4">인기 친구 추천</h3>
        {recommendations.popular.length > 0 ? (
          recommendations.popular.map((recommend, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <img
                  src={recommend.url}
                  alt={recommend.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-semibold">{recommend.name}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">추천할 친구가 없습니다.</p>
        )}
      </div>

      {/* 이번 달 생일인 친구 섹션 */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
        <div className="flex items-center mb-3">
          <Cake className="text-pink-500 mr-2" size={24} />
          <h2 className="text-lg font-bold text-gray-800">이번 달 생일인 친구</h2>
        </div>
        {birthdayFriends.length > 0 ? (
          birthdayFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-2 bg-pink-50 rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={friend.profilePicture}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <span className="block font-semibold">{friend.name}</span>
                  <span className="text-sm text-gray-500">🎂 {friend.birthday}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">이번 달 생일인 친구가 없습니다.</p>
        )}
      </div>

      {/* 전체 친구 목록 */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-bold text-gray-800 mb-3">전체 친구 목록</h2>
        {filteredFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <img
                src={friend.profilePicture}
                alt={friend.name}
                className="w-8 h-8 rounded-full mr-3"
              />
              <span>{friend.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AfterLoginPage;




