import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { API_BASE } from "../../config.js";

const LoginPage = ({ setIsLoggedIn }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      email: form.email.value,
      password: form.password.value,
    };
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Помилка: ${response.status}`);
      }

      const data = await response.json();
      console.log("Login success:", data);

      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      // window.dispatchEvent(new Event("storage"));

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Невірний email або пароль");
    }
  };
  return (
    <Container className="my_container">
      <h2 className="mb-4">Логін</h2>
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
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Пароль"
            required
          />
        </Form.Group>
        <Button variant="success" type="submit" className="w-100 mb-2">
          Увійти
        </Button>
        {error && (
          <Alert variant="danger" className="mt-2">
            {error}
          </Alert>
        )}
      </Form>
    </Container>
  );
};
export default LoginPage;
