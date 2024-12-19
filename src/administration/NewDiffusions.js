import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewDiffusions = () => {
    const [animations, setAnimations] = useState([]); // Liste des animations
    const [chaines, setChaines] = useState([]); // Liste des chaînes
    const [selectedAnimation, setSelectedAnimation] = useState('');
    const [selectedChaine, setSelectedChaine] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Récupère le token
    const apiUrl = process.env.REACT_APP_API_URL;


    // Charger les animations et chaînes au montage
    useEffect(() => {
        fetch(`${apiUrl}/api/animation`, {
            headers: {
                Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
            },
        }) // Remplacez par le bon endpoint
            .then((response) => response.json())
            .then((data) => setAnimations(data))
            .catch((error) => console.error('Erreur lors du chargement des animations:', error));

        fetch(`${apiUrl}/api/chaine`, {
            headers: {
                Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
            },
        }) // Remplacez par le bon endpoint
            .then((response) => response.json())
            .then((data) => setChaines(data))
            .catch((error) => console.error('Erreur lors du chargement des chaînes:', error));
    }, []);

    // Gestion de l'envoi du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        const diffusionData = {
            animationId: selectedAnimation,
            chaineId: selectedChaine,
        };

        fetch(`${apiUrl}/api/diffusion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
            },
            body: JSON.stringify(diffusionData),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Génial, une nouvelle diffusion !");
                    setTimeout(() => {
                      navigate("/allDiffusion");
                    }, 1500);
                } else {
                    console.log('Erreur lors de l\'ajout de la diffusion');
                }
            })
            .catch((error) => console.error('Erreur lors de l\'ajout:', error));
    };

    return (
        <>
         <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 border-2 border-gray-300/50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Ajouter une diffusion</h2>
      {/* Sélection de l'animation */}
      <label htmlFor="animation" className="block text-sm font-medium text-gray-700">Animation :</label>
            <select
                id="animation"
                value={selectedAnimation}
                onChange={(e) => setSelectedAnimation(e.target.value)}
                required
            >
                <option value="">Sélectionnez une animation</option>
                {animations.map((animation) => (
                    <option key={animation._id} value={animation._id}>
                        {animation.titre}
                    </option>
                ))}
            </select>

            {/* Sélection de la chaîne */}
            <label htmlFor="chaine" className="block text-sm font-medium text-gray-700">Chaîne :</label>
            <select
                id="chaine"
                value={selectedChaine}
                onChange={(e) => setSelectedChaine(e.target.value)}
                required
            >
                <option value=""> Sélectionnez une chaîne </option>
                {chaines.map((chaine) => (
                    <option key={chaine._id} value={chaine._id}>
                        {chaine.nom}
                    </option>
                ))}
            </select>
     
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full font-semibold py-2 px-4 rounded-md bg-white text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white transition"
      >
        Ajouter la diffusion
      </button>
    </form>
        </>
    )
}
export default NewDiffusions