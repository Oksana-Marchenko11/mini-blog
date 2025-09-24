import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      email: form.email.value,
      username: form.username.value,
      password: form.password.value,
    };
    console.log("Register data:", formData);
    console.log(JSON.stringify(formData));
    fetch("http://localhost:3000/api/auth/register", {
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
    <div>
      <h2>Реєстрація</h2>
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
        <input
          type="text"
          name="username"
          placeholder="Ім'я користувача"
          required
        />
        <input type="password" name="password" placeholder="Пароль" required />
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
};

export default RegisterPage;
