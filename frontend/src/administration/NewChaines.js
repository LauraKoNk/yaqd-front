import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewChaines = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Récupère le token
  const apiUrl = process.env.REACT_APP_API_URL;

  
  const [formData, setFormData] = useState({
    nom: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Envoi des données au backend
    fetch(`${apiUrl}/api/chaine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data); // `data` est maintenant défini
        toast.success("Et une nouvelle chaine, une !");
        setTimeout(() => {
          navigate("/allChaine");
        }, 1500);
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 border-2 border-gray-300/50 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Ajouter une chaîne</h2>

        {/* Titre */}
        <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
          Nom de la chaine
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          className="mt-1 mb-4 block w-full rounded-md border-gray-300 shadow-sm "
        />


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full font-semibold py-2 px-4 rounded-md bg-white text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white transition"
        >
          Ajouter la chaine
        </button>
      </form>
    </>
  )
}
export default NewChaines