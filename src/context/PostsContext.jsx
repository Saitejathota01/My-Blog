import React, { createContext, useState, useContext, useEffect } from 'react';

const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

const loadPostsFromLocalStorage = () => {
  const posts = localStorage.getItem('posts');
  return posts ? JSON.parse(posts) : [];
};

const savePostsToLocalStorage = (posts) => {
  localStorage.setItem('posts', JSON.stringify(posts));
};

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(loadPostsFromLocalStorage);

  useEffect(() => {
    savePostsToLocalStorage(posts);
  }, [posts]);

  const addPost = (post) => {
    const newPost = { ...post, id: Date.now() };
    setPosts([...posts, newPost]);
  };

  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};
