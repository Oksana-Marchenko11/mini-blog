import { API_BASE } from "../config";

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

export const editMyPost = async (id, data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/api/posts/my-posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Edit failed: ${res.status}`);
  }

  return res.json();
};

export const fetchOnePostById = async (id) => {
  const res = await fetch(`${API_BASE}/api/posts/all-posts/${id}`);
  return res.json();
};
