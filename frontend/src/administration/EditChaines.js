import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditChaines = () => {
    const token = localStorage.getItem("token"); // Récupère le token
    const { id } = useParams(); // Récupère l'ID de la chaine depuis l'URL
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;


    const [formData, setFormData] = useState({
        nom: "",
      });
  
    // Récupérer les données de la chaine existante
    useEffect(() => {
      fetch(`${apiUrl}/api/chaine/${id}`, {headers: {
        Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
    },})
        .then((res) => res.json())
        .then((data) => setFormData(data))
        .catch((error) => console.error("Erreur :", error));
    }, [id]);
  
    // Gestion des champs simples
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    // Soumission du formulaire pour modification
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`${apiUrl}/api/chaine/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(() => {
          toast("Ok la chaine a été modifiée avec succès !", { type: "success" });
          console.log("Chaine modifiée avec succès !");
          setTimeout(() => {
            navigate("/allChaine");
          }, 1500);
        })
        .catch((error) => console.error("Erreur lors de la modification :", error));
    };
  
    return (
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 border-2 border-gray-300/50 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Modifier la chaine</h2>
  
        {/* Titre */}
        <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
          Titre
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          className="mt-1 mb-4 block w-full rounded-md border-gray-300 shadow-sm"
        />
  
        {/* Submit */}
        <button
          type="submit"
          className="w-full font-semibold py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          Modifier la chaine
        </button>
      </form>
    );
}

export default EditChaines