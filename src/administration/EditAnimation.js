import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditAnimation = () => {
    const token = localStorage.getItem("token"); // Récupère le token
    const { id } = useParams(); // Récupère l'ID de l'animation depuis l'URL
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    
    const [formData, setFormData] = useState({
        titre: "",
        annee_premiere_diffusion: "",
        studio: "",
        pays: [],
        genre: [],
        format: "",
        synopsis: "",
        image: "",
        lien: [],
    });

    const [newPays, setNewPays] = useState("");
    const [newGenre, setNewGenre] = useState("");
    const [newLien, setNewLien] = useState("");

    // Récupérer les données de l'animation existante
    useEffect(() => {
        if (!token) {
            toast.error("Token non valide. Veuillez vous reconnecter.");
            navigate('/login');
            return; // Stoppe l'exécution du useEffect
        }
        fetch(`${apiUrl}/api/animation/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
            },
        })
            .then((res) => res.json())
            .then((data) => setFormData(data))
            .catch((error) => console.error("Erreur :", error));
    }, [apiUrl,token,id]);

    // Gestion des champs simples
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Ajouter un pays
    const addPays = () => {
        if (newPays.trim() !== "") {
            setFormData({ ...formData, pays: [...formData.pays, newPays] });
            setNewPays("");
        }
    };

    // Ajouter un genre
    const addGenre = () => {
        if (newGenre.trim() !== "") {
            setFormData({ ...formData, genre: [...formData.genre, newGenre] });
            setNewGenre("");
        }
    };

    // Ajouter un lien
    const addLien = () => {
        if (newLien.trim() !== "") {
            setFormData({ ...formData, lien: [...formData.lien, newLien] });
            setNewLien("");
        }
    };

    // Soumission du formulaire pour modification
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Données qui sont envoyées:', formData);
        fetch(`${apiUrl}/api/animation/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                toast("Ok l'animation a été modifiée avec succès !", { type: "success" });
                console.log("L'animation a été modifiée avec succès !", formData);
                setTimeout(() => {
                    navigate("/allAnimation");
                }, 1500);
            })
            .catch((error) => console.error("Erreur lors de la modification :", error));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto p-6 border-2 border-gray-300/50 rounded-lg shadow-md"
        >
            <h2 className="text-2xl font-bold mb-4">Modifier l'Animation</h2>

            {/* Titre */}
            <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
                Titre
            </label>
            <input
                type="text"
                id="titre"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                required
                className="mt-1 mb-4 block w-full rounded-md border-gray-300 shadow-sm"
            />

            {/* Année de première diffusion */}
            <label htmlFor="annee_premiere_diffusion" className="block text-sm font-medium text-gray-700">
                Année de la première diffusion
            </label>
            <input
                type="text"
                id="annee_premiere_diffusion"
                name="annee_premiere_diffusion"
                value={formData.annee_premiere_diffusion}
                onChange={handleChange}
                required
                className="mt-1 mb-4 block w-full rounded-md border-gray-300 shadow-sm"
            />

            {/* Studio */}
            <label htmlFor="studio" className="block text-sm font-medium text-gray-700">
                Studio (optionnel)
            </label>
            <input
                type="text"
                id="studio"
                name="studio"
                value={formData.studio}
                onChange={handleChange}
                className="mt-1 mb-4 block w-full rounded-md border-gray-300 shadow-sm"
            />

            {/* Pays */}
            <label htmlFor="pays" className="block text-sm font-medium text-gray-700">
                Pays d'origine (optionnel)
            </label>
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    id="pays"
                    value={newPays}
                    onChange={(e) => setNewPays(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm"
                />
                <button type="button" onClick={addPays} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                    Ajouter
                </button>
            </div>
            <ul>
                {formData.pays.map((pays, index) => (
                    <li key={index}>{pays}</li>
                ))}
            </ul>

            {/* Genre */}
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                Genre
            </label>
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    id="genre"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm"
                />
                <button type="button" onClick={addGenre} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                    Ajouter
                </button>
            </div>
            <ul>
                {formData.genre.map((genre, index) => (
                    <li key={index}>{genre}</li>
                ))}
            </ul>

            {/* Format */}
            <label htmlFor="format" className="block text-sm font-medium text-gray-700">
                Format
            </label>
            <input
                type="text"
                id="format"
                name="format"
                value={formData.format}
                onChange={handleChange}
                required
                className="mt-1 mb-4 block w-full rounded-md border-gray-300 shadow-sm"
            />

            {/* Synopsis */}
            <label htmlFor="synopsis" className="block text-sm font-medium text-gray-700">
                Synopsis
            </label>
            <textarea
                id="synopsis"
                name="synopsis"
                value={formData.synopsis}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 mb-4 block w-full rounded-md border-gray-300 shadow-sm"
            ></textarea>

            {/* Image */}
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                URL de l'image (optionnel)
            </label>
            <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="mt-1 mb-4 block w-full rounded-md border-gray-300 shadow-sm"
            />

            {/* Liens */}
            <label htmlFor="lien" className="block text-sm font-medium text-gray-700">
                Liens où visionner (optionnel)
            </label>
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    id="lien"
                    value={newLien}
                    onChange={(e) => setNewLien(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm"
                />
                <button type="button" onClick={addLien} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                    Ajouter
                </button>
            </div>
            <ul>
                {formData.lien.map((lien, index) => (
                    <li key={index}>{lien}</li>
                ))}
            </ul>

            {/* Submit */}
            <button
                type="submit"
                className="w-full font-semibold py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
                Modifier l'animation
            </button>
        </form>
    );
};

export default EditAnimation;
