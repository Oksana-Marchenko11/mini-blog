import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePostPage.module.css";
import { Container, Form, Button, Alert } from "react-bootstrap";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        "https://mbapi.oksi.pp.ua/api/posts/my-posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ title, content }),
        }
      );

      if (!response.ok) {
        throw new Error(`Помилка: ${response.status}`);
      }

      const data = await response.json();
      console.log("Пост створено:", data);
      setSuccess(true);
      setTitle("");
      setContent("");
      navigate("/my-posts");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <Container className="my_container">
      <h2 className="mb-4">Створити пост</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Пост успішно створено!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введіть заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formContent">
          <Form.Label>Текст поста</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Введіть текст поста"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Створити пост
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePostPage;
