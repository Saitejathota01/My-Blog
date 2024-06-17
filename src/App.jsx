import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ViewPost from './components/ViewPost';
import EditPost from './components/EditPost';
import CreatePost from './components/CreatePost';
import { PostsProvider } from './context/PostsContext';



const App = () => {
  return (
    <PostsProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:id" element={<ViewPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </PostsProvider>
  );
};

export default App;
