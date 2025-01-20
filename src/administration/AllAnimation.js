import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import BarreAdmin from "../administration/BarreAdmin";
const apiUrl = process.env.REACT_APP_API_URL;


const AllAnimation = () => {
    const [animations, setAnimations] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Récupère le token

    useEffect(() => {
        if (!token) {
            toast.error("Token non valide. Veuillez vous reconnecter.");
            navigate('/login');
            return; // Stoppe l'exécution du useEffect
        }
        // Récupération des données depuis la route API
        fetch(`${apiUrl}/api/animation`, {
            headers: {
                Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Erreur lors de la récupération des animations.");
                }
                return res.json();
            })
            .then((data) => setAnimations(data))
            .catch((error) => setError(error.message));
    }, [apiUrl,token] // Ici, ajout de 'token' dans les dépendances pour s'assurer qu'il est toujours à jour. Pour que useEffect soit réexécuté à chaque fois que le token change, il faut l’ajouter à la liste des dépendances :
    );

    // Fonction pour supprimer une animation
    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette animation ?")) {
            fetch(`${apiUrl}/api/animation/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Erreur lors de la suppression de l'animation.");
                    }
                    return res.json();
                })
                .then(() => {
                    setAnimations((prevAnimations) =>
                        prevAnimations.filter((animation) => animation._id !== id)
                    );
                    toast.success("Animation supprimée avec succès !");
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Erreur lors de la suppression de l'animation.");
                });
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            <aside className="w-full md:w-1/4 bg-gray-200">
                <BarreAdmin />
            </aside>
            <main className="flex-1 bg-gray-100 p-4 md:p-8">
                <h1 className="text-3xl font-bold text-center mb-6">Liste des Animations</h1>

                {error && (
                    <p className="text-red-500 text-center mb-4">
                        Une erreur est survenue : {error}
                    </p>
                )}

                {/* Tableau des animations */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Titre</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Année</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Studio</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Pays</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Genres</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Format</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Synopsis</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Liens</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Modifier</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {animations.length > 0 ? (
                                animations.map((animation) => (
                                    <tr key={animation._id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{animation.titre}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {animation.annee_premiere_diffusion}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{animation.studio}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {animation.pays.join(", ")}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {animation.genre.join(", ")}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{animation.format}</td>
                                        <td className="border border-gray-300 px-4 py-2 line-clamp-4 overflow-y-auto">
                                            {animation.synopsis}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {animation.lien.map((lien, index) => (
                                                <a
                                                    key={index}
                                                    href={lien}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline block"
                                                >
                                                    Lien {index + 1}
                                                </a>
                                            ))}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <Link
                                                to={`/editAnimation/${animation._id}`}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Modifier
                                            </Link>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(animation._id)}
                                                className="text-red-500 hover:underline"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="10"
                                        className="text-center py-4 text-gray-500 font-semibold"
                                    >
                                        Aucune animation trouvée.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Link to='/newAnimation'>
                    <a>Ajouter une animation</a>
                </Link>
            </main>

        </div>
    );
};

export default AllAnimation;
