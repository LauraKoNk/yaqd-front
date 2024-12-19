import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Vérifie si un token est présent

  if (!token) {
    // Si pas de token, redirige vers la page de login
    return <Navigate to="/login" />;
  }

  // Si token valide, affiche la route protégée
  return children;
};

export default PrivateRoute;
