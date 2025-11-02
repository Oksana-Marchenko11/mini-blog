import { HashRouter, Route, Routes } from "react-router-dom";
// import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import MyPostsPage from "./pages/MyPostsPage";
import { Header } from "./components/Header";
import "./App.css";
import { AuthProvider } from "./AuthProvider";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-posts" element={<MyPostsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
