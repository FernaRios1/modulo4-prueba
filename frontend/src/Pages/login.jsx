import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

const Login = () => {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const success = await login(email, password);

    if (success) {
      setMessage("Inicio de sesión exitoso");
      navigate("/profile");
    } else {
      setMessage("Credenciales incorrectas");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu email"
            className="form-control"
          />
        </div>

        <div className="form-group mt-3">
          <label>Contraseña</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Iniciar sesión
        </button>
      </form>

      {message && <p className="mt-3 text-danger">{message}</p>}
    </div>
  );
};

export default Login;
