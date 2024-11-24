'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

type Story = {
  story_id: number;
  media_url: string;
  user_id: string;
  post_at: string | null;
};

type Friend = {
  user_id: number;
  name: string;
  avatar: string;
  has_story: number;
  story_count: number;
  story_url: string | null;
};

type StoryResponse = {
  name: string[];
  story_url: string[];
  upload_time: string[];
};

type FriendResponse = {
  name: string[];
  image: string[];
  has_story: number[];
  story_count: number[];
  story_url: string[];
};

const StoryView = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loadingStories, setLoadingStories] = useState(true);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);

  const fetchStories = async (likedOnly = false) => {
    try {
      const endpoint = likedOnly ? 'http://127.0.0.1:5000/hearted-story' : 'http://127.0.0.1:5000/story';
      const response = await axios.post<StoryResponse>(endpoint, {
        start_time: "2024-11-21 20:00:00",
        end_time: "2024-11-22 20:00:00",
      });

      const transformedStories = response.data.story_url.map((url, index) => ({
        story_id: index + 1,
        media_url: url ? `/image/story/${url}` : '', // story_url 경로 설정
        user_id: response.data.name[index],
        post_at: response.data.upload_time[index] || null,
      }));
      setStories(transformedStories);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoadingStories(false);
    }
  };

  const fetchFriends = async (likedOnly = false) => {
    try {
      const endpoint = likedOnly ? 'http://127.0.0.1:5000/hearted-friend_list' : 'http://127.0.0.1:5000/friend_list';
      const response = await axios.post<FriendResponse>(endpoint, {
        user_id: 1,
        start_time: "2024-11-21 20:00:00",
        end_time: "2024-11-22 20:00:00",
      });

      const transformedFriends = response.data.name.map((name, index) => ({
        user_id: index + 1,
        name,
        avatar: `/image/profile/${response.data.image[index]}`, // avatar 경로 설정
        has_story: response.data.has_story[index],
        story_count: response.data.story_count[index],
        story_url: response.data.story_url[index] ? `/image/story/${response.data.story_url[index]}` : null, // story_url 경로 설정
      }));
      setFriends(transformedFriends);
    } catch (error) {
      console.error("Error fetching friends:", error);
    } finally {
      setLoadingFriends(false);
    }
  };

  const handleLikedFilter = () => {
    setShowLikedOnly(!showLikedOnly);
    setLoadingStories(true);
    setLoadingFriends(true);

    if (!showLikedOnly) {
      fetchStories(true);
      fetchFriends(true);
    } else {
      fetchStories();
      fetchFriends();
    }
  };

  const openStory = (story: Story, index: number) => {
    setActiveStory(story);
    setStoryIndex(index);
  };

  const closeStory = () => {
    setActiveStory(null);
  };

  const nextStory = () => {
    if (storyIndex < stories.length - 1) {
      setStoryIndex(storyIndex + 1);
      setActiveStory(stories[storyIndex + 1]);
    } else {
      closeStory();
    }
  };

  const previousStory = () => {
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
      setActiveStory(stories[storyIndex - 1]);
    }
  };

  useEffect(() => {
    fetchStories();
    fetchFriends();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Filter Button */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={handleLikedFilter}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full
            ${showLikedOnly ? 'bg-red-500' : 'bg-gray-800'}
            hover:opacity-90 transition-all duration-300
          `}
        >
          <Heart className={showLikedOnly ? 'fill-white' : ''} size={20} />
          <span>{showLikedOnly ? 'Show All' : 'Hearted Only'}</span>
        </button>
      </div>

      {/* Friends List */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Friends</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 px-2">
          {loadingFriends ? (
            <div className="text-gray-400">Loading friends...</div>
          ) : friends.length === 0 ? (
            <div className="text-gray-400">No friends available</div>
          ) : (
            friends.map((friend) => (
              <div
                key={friend.user_id}
                className="flex flex-col items-center min-w-[80px] flex-shrink-0 cursor-pointer"
                onClick={() => {
                  if (friend.story_url) {
                    setActiveStory({
                      story_id: friend.user_id,
                      media_url: friend.story_url,
                      user_id: friend.name,
                      post_at: null,
                    });
                  }
                }}
              >
                <div className="relative w-20 h-20 mb-2">
                  {friend.has_story === 1 ? (
                    <div className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                        padding: "2px",
                      }}
                    >
                      <div className="bg-gray-900 w-full h-full rounded-full p-[2px]">
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      {/* Story Count Badge */}
                      <div className="absolute bg-pink-500 rounded-full shadow-lg flex items-center justify-center text-xs font-bold"
                        style={{
                          top: '0px',
                          right: '-5px',
                          minWidth: '22px',
                          height: '22px',
                        }}
                      >
                        {friend.story_count}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-full border-2 border-gray-700 overflow-hidden">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <span className="text-sm text-center w-full truncate px-1">{friend.name}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Stories Grid */}
<div>
  <h2 className="text-xl font-bold mb-4">Stories</h2>
  <div className="grid grid-cols-3 gap-4">
    {loadingStories ? (
      <div className="text-gray-400">Loading stories...</div>
    ) : stories.length === 0 ? (
      <div className="text-gray-400">No stories available</div>
    ) : (
      stories.map((story, index) => (
        <div
          key={story.story_id}
          onClick={() => openStory(story, index)}
          className="cursor-pointer relative aspect-square"
        >
          <img
            src={story.media_url}
            alt={`Story by ${story.user_id}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))
    )}
  </div>
</div>

      {/* Full Screen Story View */}
      {activeStory && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={closeStory}
            className="absolute top-4 right-4 text-white z-10"
          >
            ✕
          </button>

          <button
            onClick={previousStory}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
            disabled={storyIndex === 0}
          >
            <ChevronLeft size={32} className={storyIndex === 0 ? 'opacity-50' : 'opacity-100'} />
          </button>

          <button
            onClick={nextStory}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
            disabled={storyIndex === stories.length - 1}
          >
            <ChevronRight size={32} className={storyIndex === stories.length - 1 ? 'opacity-50' : 'opacity-100'} />
          </button>

          <div className="w-full max-w-2xl aspect-square relative">
            <img
              src={activeStory.media_url}
              alt={`Story by ${activeStory.user_id}`}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="text-white">
                <p className="font-bold">{activeStory.user_id}</p>
                <p className="text-sm opacity-80">
                  {activeStory.post_at
                    ? new Date(activeStory.post_at).toLocaleString()
                    : "No timestamp available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryView;