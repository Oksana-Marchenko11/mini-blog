import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
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
      const response = await fetch("http://localhost:3000/api/auth/login", {
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

      navigate("/posts");

      alert(`Вітаю, ${data.user.username}! Ви успішно увійшли.`);
    } catch (err) {
      console.error("Login error:", err);
      setError("Невірний email або пароль");
    }
  };
  return (
    <div>
      <h2>Логін</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 400,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Пароль" required />
        <button type="submit">Увійти</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};
export default LoginPage;
