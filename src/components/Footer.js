import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Footer = ({handleToTop}) => {
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
      <div className="bg-black text-white space-y-5 md:space-y-0 p-7 md:p-16 md:flex md:justify-between font-wallop-semibold">
        <div className="md:hidden flex flex-col space-y-8">
          <div className="w-full p-10 flex justify-center">
            <img src="/assets/YAQD-logo.png" alt="Logo" className="md:hidden h-24" />
          </div>
          <p className="md:hidden pl-0 pb-8 text-sm text-balance max-w-[250px]"> Tous les programmes jeunesses des années 2000 et + qui ont bercé ton enfance sont recensés ici.</p>
        </div>
        <div className="leftSide">
          <img src="/assets/YAQD-logo.png" alt="Logo" className="hidden md:block md:h-16 md:pl-10" />
          <p className="hidden md:block pt-5 text-sm text-balance md:max-w-[250px]">
            Tous les programmes jeunesses des années 2000 et + qui ont bercé ton enfance sont recensés ici.
          </p>
        </div>
        <div className="rightSide flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-5">
          <Link to="/" onClick={handleToTop}>
            Voir tout
          </Link>
          <Link to='/mentions-legales' onClick={handleToTop}>
            Mentions légales
          </Link>
          <Link to='/contact' onClick={handleToTop}>
            Contact
          </Link>
          {user ? <><Link to='/indexAdmin' onClick={handleToTop}>
          Admin
        </Link>
            <button onClick={handleLogout} className="text-white border rounded px-4 h-7 w-36">
              Déconnexion
            </button> </>
           : <Link to="/login" onClick={handleToTop}>Login</Link>
          }
        </div>
      </div>
      <div className="copyrights text-center py-2 bg-black text-white">
        <p>© Yaqd 2025</p>
      </div>
    </>
  );
};

export default Footer;
