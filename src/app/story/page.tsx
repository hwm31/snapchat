// StoryView.tsx
import React from 'react';
import styles from './StoryView.module.css';

// Hardcoded story data (as if it was fetched from an API)
const stories = [
  {
    story_id: 1,
    user_id: 1,
    media_url: "https://example.com/myphoto1.jpg",
    post_at: "2024-11-20T12:00:00.000Z"
  },
  {
    story_id: 2,
    user_id: 2,
    media_url: "https://example.com/myphoto2.jpg",
    post_at: "2024-11-20T12:30:00.000Z"
  },
  {
    story_id: 3,
    user_id: 3,
    media_url: "https://example.com/myphoto3.jpg",
    post_at: "2024-11-20T13:00:00.000Z"
  },
  // Add more stories as needed
];

// Hardcoded friends data
const friends = [
  { user_id: 1, name: 'User 1', avatar: "https://example.com/user1.jpg" },
  { user_id: 2, name: 'User 2', avatar: "https://example.com/user2.jpg" },
  { user_id: 3, name: 'User 3', avatar: "https://example.com/user3.jpg" },
  { user_id: 4, name: 'User 4', avatar: "https://example.com/user4.jpg" },
  { user_id: 5, name: 'User 5', avatar: "https://example.com/user5.jpg" },
  { user_id: 6, name: 'User 6', avatar: "https://example.com/user5.jpg" },
  { user_id: 7, name: 'User 7', avatar: "https://example.com/user5.jpg" },
  { user_id: 8, name: 'User 8', avatar: "https://example.com/user5.jpg" },
  { user_id: 9, name: 'User 9', avatar: "https://example.com/user5.jpg" },
  { user_id: 10, name: 'User 10', avatar: "https://example.com/user5.jpg" },
  { user_id: 11, name: 'User 11', avatar: "https://example.com/user5.jpg" },
  { user_id: 12, name: 'User 12', avatar: "https://example.com/user5.jpg" },
  { user_id: 13, name: 'User 13', avatar: "https://example.com/user5.jpg" },
  { user_id: 14, name: 'User 14', avatar: "https://example.com/user5.jpg" },
  { user_id: 15, name: 'User 15', avatar: "https://example.com/user5.jpg" },
  { user_id: 16, name: 'User 16', avatar: "https://example.com/user5.jpg" },
  { user_id: 17, name: 'User 17', avatar: "https://example.com/user5.jpg" },
  { user_id: 18, name: 'User 18', avatar: "https://example.com/user5.jpg" },

];

const StoryView = () => {
  return (
    <div className={styles.storyContainer}>

      {/* Friends' List - Horizontally Scrolling */}
      <h2>Friends</h2>
      <div className={styles.friendsScrollContainer}>
        {friends.length === 0 ? (
          <p>No friends available</p>
        ) : (
          friends.map((friend) => (
            <div key={friend.user_id} className={styles.friendItem}>
              <div className={styles.friendAvatarContainer}>
                <img src={friend.avatar} alt={`${friend.name}'s avatar`} className={styles.friendAvatar} />
              </div>
              <p className={styles.friendName}>{friend.name}</p>
            </div>
          ))
        )}
      </div>

      {/* Stories Section */}
      <h2>Stories</h2>
      <div className={styles.storiesList}>
        {stories.length === 0 ? (
          <p>No stories available</p>
        ) : (
          <div className={styles.storiesGrid}>
            {stories.map((story) => (
              <div key={story.story_id} className={styles.storyItem}>
                <div className={styles.storyImageContainer}>
                  <img src={story.media_url} alt="story media" className={styles.storyImage} />
                </div>
                <p>{`Posted by User ID: ${story.user_id}`}</p>
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


