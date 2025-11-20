import { HashRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import MyPostsPage from "./pages/MyPostsPage";
import OnePostsPage from "./pages/OnePostPage";
import { Header } from "./layout/Header";
import "./App.css";
import { AuthProvider } from "./AuthProvider";
import { MantineProvider } from "@mantine/core";


function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <HashRouter>
            <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<HomePage />} />
              <Route path="/my-posts" element={<MyPostsPage />} />
              <Route path="post/:id" element={<OnePostsPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="create-post" element={<CreatePostPage />} />
           </Route>
          </Routes>
        </HashRouter>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
