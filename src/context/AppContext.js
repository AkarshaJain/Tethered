import React, { createContext, useState, useEffect } from 'react';
import { users, currentUser, posts, chatGroups } from '../data/mockData';

// Create the context
export const AppContext = createContext();

// Create the context provider
export const AppProvider = ({ children }) => {
  // State for users
  const [allUsers, setAllUsers] = useState(users);
  const [user, setUser] = useState(currentUser);
  
  // State for posts
  const [allPosts, setAllPosts] = useState(posts);
  
  // State for chat groups
  const [allChatGroups, setChatGroups] = useState(chatGroups);
  const [selectedChat, setSelectedChat] = useState(null);
  
  // Function to add a new post
  const addPost = (content) => {
    const newPost = {
      id: allPosts.length + 1,
      author: user,
      content,
      image: null,
      likes: 0,
      comments: 0,
      shares: 0,
      tags: [],
      timestamp: new Date(),
    };
    
    setAllPosts([newPost, ...allPosts]);
  };
  
  // Function to like a post
  const likePost = (postId) => {
    setAllPosts(
      allPosts.map((post) => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };
  
  // Function to add a message to a chat group
  const sendMessage = (groupId, content) => {
    setChatGroups(
      allChatGroups.map((group) => {
        if (group.id === groupId) {
          const newMessage = {
            id: group.messages.length + 1,
            user,
            content,
            timestamp: new Date(),
          };
          return { 
            ...group, 
            messages: [...group.messages, newMessage] 
          };
        }
        return group;
      })
    );
  };
  
  // Function to update user profile
  const updateProfile = (profileData) => {
    setUser({ ...user, ...profileData });
  };
  
  // Value object to be provided to consumers
  const contextValue = {
    allUsers,
    user,
    allPosts,
    allChatGroups,
    selectedChat,
    setSelectedChat,
    addPost,
    likePost,
    sendMessage,
    updateProfile,
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useApp = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 