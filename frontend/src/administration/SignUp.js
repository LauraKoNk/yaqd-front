import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log('Données qui sont envoyées:', formData);
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast("Inscription réussie !", { type: "success" });
        console.log("Inscription réussie :", data);
        // Redirigez l'utilisateur vers la page de connexion
        setTimeout(() => {
            navigate("/login");
        }, 1000);
      } else {
        console.error("Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 border rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Inscription</h2>
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
        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        S'inscrire
      </button>
    </form>
  );
};

export default SignUp;