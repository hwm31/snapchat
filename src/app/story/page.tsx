'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart } from 'lucide-react';
import styles from './StoryView.module.css';

// Type definitions for data structures
type Story = {
  story_id: number;
  media_url: string;
  user_id: string;
  post_at: string;
};

type Friend = {
  user_id: number;
  name: string;
  avatar: string;
};

type StoryResponse = {
  name: string[];
  story_url: string[];
  upload_time: string[];
};

type FriendResponse = {
  name: string[];
  image: string[];
};

const StoryView = () => {
  const [stories, setStories] = useState<Story[]>([]); 
  const [friends, setFriends] = useState<Friend[]>([]); 
  const [loadingStories, setLoadingStories] = useState(true);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [showLikedOnly, setShowLikedOnly] = useState(false);

  // Fetch stories from the Flask server
  const fetchStories = async (likedOnly = false) => {
    try {
      const endpoint = likedOnly ? 'http://127.0.0.1:5000/hearted-story' : 'http://127.0.0.1:5000/story';
      const response = await axios.post<StoryResponse>(endpoint, {
        start_time: "2024-11-21 12:00:00",
        end_time: "2024-11-22 12:00:00",
      });

      console.log("Stories response:", response.data);

      const transformedStories = response.data.story_url.map((url, index) => ({
        story_id: index + 1,
        media_url: url,
        user_id: response.data.name[index],
        post_at: response.data.upload_time[index],
      }));
      setStories(transformedStories);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoadingStories(false);
    }
  };

  // Fetch friends from the Flask server
  const fetchFriends = async (likedOnly = false) => {
    try {
      const endpoint = likedOnly ? 'http://127.0.0.1:5000/hearted-friend_list' : 'http://127.0.0.1:5000/friend_list';
      const response = await axios.post<FriendResponse>(endpoint, {
        user_id: 1, // Replace with actual user_id
      });

      console.log("Friends response:", response.data);

      const transformedFriends = response.data.name.map((name, index) => ({
        user_id: index + 1,
        name,
        avatar: response.data.image[index],
      }));
      setFriends(transformedFriends);
    } catch (error) {
      console.error("Error fetching friends:", error);
    } finally {
      setLoadingFriends(false);
    }
  };

  // Liked content filter handler
  const handleLikedFilter = () => {
    setShowLikedOnly(!showLikedOnly);
    
    // Reset loading states
    setLoadingStories(true);
    setLoadingFriends(true);

    // Fetch liked content
    if (!showLikedOnly) {
      fetchStories(true);
      fetchFriends(true);
    } else {
      // Revert to original content
      fetchStories();
      fetchFriends();
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchStories();
    fetchFriends();
  }, []);

  return (
    <div className={styles.storyContainer}>
      {/* Liked Content Filter Button with Heart */}
      <div className={`${styles.filterContainer} flex items-center justify-end p-4`}>
        <button 
          onClick={handleLikedFilter} 
          className={`
            flex items-center justify-center 
            px-4 py-2 
            bg-white 
            border-2 
            ${showLikedOnly ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-500'}
            rounded-full 
            hover:bg-gray-50 
            transition-all 
            duration-300 
            shadow-sm
            space-x-2
          `}
        >
          <Heart 
            className={`
              ${showLikedOnly ? 'fill-red-500 text-red-500' : 'text-gray-400'}
              transition-all 
              duration-300
            `}
            size={20}
          />
          <span>{showLikedOnly ? 'Show All' : 'Liked Only'}</span>
        </button>
      </div>

      {/* Friends' List - Horizontally Scrolling */}
      <h2>Friends</h2>
      <div className={styles.friendsScrollContainer}>
        {loadingFriends ? (
          <p>Loading friends...</p>
        ) : friends.length === 0 ? (
          <p>No friends available</p>
        ) : (
          friends.map((friend) => (
            <div key={friend.user_id} className={styles.friendItem}>
              <div className={styles.friendAvatarContainer}>
                <img
                  src={friend.avatar}
                  alt={`${friend.name}'s avatar`}
                  className={styles.friendAvatar}
                />
              </div>
              <p className={styles.friendName}>{friend.name}</p>
            </div>
          ))
        )}
      </div>

      {/* Stories Section */}
      <h2>Stories</h2>
      <div className={styles.storiesList}>
        {loadingStories ? (
          <p>Loading stories...</p>
        ) : stories.length === 0 ? (
          <p>No stories available</p>
        ) : (
          <div className={styles.storiesGrid}>
            {stories.map((story) => (
              <div key={story.story_id} className={styles.storyItem}>
                <div className={styles.storyImageContainer}>
                  <img
                    src={story.media_url}
                    alt="story media"
                    className={styles.storyImage}
                  />
                </div>
                <p>{`Posted by User: ${story.user_id}`}</p>
                <p>{new Date(story.post_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryView;