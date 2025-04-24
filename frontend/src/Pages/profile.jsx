import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "./UserContext";

const Profile = () => {
  const { getProfile, logout } = useUser();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getProfile();
      if (user?.email) {
        setEmail(user.email);
      } else {
        logout();
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container className="pt-5 text-center">
      <h2>Perfil de Usuario</h2>
      <p>Email: {email || "Cargando..."}</p>
      <Button variant="danger" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </Container>
  );
};

export default Profile;
