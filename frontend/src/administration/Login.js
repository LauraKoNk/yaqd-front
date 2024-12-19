import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            navigate("/indexAdmin");
            toast("Vous êtes connecté !", { type: "success" });
            window.location.reload();
         }
        
        // Redirigez l'utilisateur vers une page protégée, par exemple :
      
      } else {
        console.error("Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
  <>
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 border rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Connexion</h2>
      <label className="block mb-2">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="block w-full mt-1 p-2 border rounded"
        />
      </label>
      <label className="block mb-4">
        Mot de passe:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="block w-full mt-1 p-2 border rounded"
        />
      </label>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Se connecter
      </button>
    </form>
    </>
  );
};

export default Login;