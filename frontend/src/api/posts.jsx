// src/api/posts.jsx
import { API_BASE } from "../../config";
console.log(API_BASE);
// Всі пости

export const fetchAllPosts = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/posts/all-posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error(`Помилка: ${response.status}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteMyPost = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/api/posts/my-posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error(`Помилка: ${response.status}`);
  } catch (err) {
    console.error(err);
  }
};

export const fetchMyPosts = async () => {
  const res = await fetch(`${API_BASE}/api/posts/my-posts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

// Редагування поста
export const editMyPost = async (id, data, token) => {
  const res = await fetch(`${API_BASE}/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
