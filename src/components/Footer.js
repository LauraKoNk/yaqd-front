import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Footer = () => {
  const [user, setUser] = useState(false); // Initialisation de l'état utilisateur
  const navigate = useNavigate();

  // Vérifie si un utilisateur est connecté
  useEffect(() => {
    const token = localStorage.getItem("token"); // Récupère le token
    if (token) {
      setUser(true); // Si un token existe, l'utilisateur est connecté
    }
  }, []); // Exécute uniquement au montage du composant

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    setUser(false); // Met à jour l'état utilisateur
    toast("Vous avez été déconnecté !", { type: "success" });
    navigate("/login"); // Redirige l'utilisateur vers la page de connexion
  };

  return (
    <>
      <div className="bg-black text-white p-16 flex justify-between font-wallop-semibold">
        <div className="leftSide">
          <img src="/assets/YAQD-logo.png" alt="Logo" className="h-16 pl-10" />
          <p className="pt-5 text-sm text-balance max-w-[250px]">
            Tous les programmes jeunesses des années 2000 et + qui ont bercé ton enfance sont recensés ici.
          </p>
        </div>
        <div className="flex gap-5">
          <Link to="/">Voir tout </Link>
          <Link to="/mentions-legales">Mentions légales </Link>
          <Link to="/contact"> Contact</Link>
          {user && <Link to="/indexAdmin">Admin</Link>}
          {user ?
            <button onClick={handleLogout} className="text-white border rounded px-4 h-7">
              Déconnexion
            </button> : <Link to="/login">Login</Link>
          }
        </div>
      </div>
      <div className="copyrights text-center py-2 bg-black text-white">
        <p>© YAQD 2024</p>
      </div>
    </>
  );
};

export default Footer;
