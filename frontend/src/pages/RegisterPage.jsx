import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { API_BASE } from "../config.js";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      email: form.email.value,
      username: form.username.value,
      password: form.password.value,
    };
       const confirm = form.confirm.value;
     if (formData.password.length < 6) {
      return setError("Пароль має містити мінімум 6 символів");
    }

    if (!/[0-9]/.test(formData.password)) {
      return setError("Пароль має містити хоча б одну цифру");
    }

    if (formData.password !== confirm) {
      return setError("Паролі не збігаються");
    }
    console.log("Register data:", formData);
    console.log(JSON.stringify(formData));
    fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/login");
        alert("Реєстрація успішна! Тепер ви можете увійти.");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container className="my_container">
      <h2 className="mb-4">Реєстрація</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Ім'я користувача</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Ім'я користувача"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Пароль"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Підтвердження пароля</Form.Label>
          <Form.Control
          type="password"
          name="confirm"
          placeholder="Пароль"
          required />
        </Form.Group>

         <Button variant="success" type="submit" className="w-100 mb-2">
          Зареєструватися
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
