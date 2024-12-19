import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Assurez-vous que react-toastify est installé et configuré
import "react-toastify/dist/ReactToastify.css"; // Styles pour react-toastify
import BarreAdmin from "../administration/BarreAdmin";

const AllDiffusions = () => {
    const [diffusions, setDiffusions] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token"); // Récupère le token
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        if (!token) {
            toast.error("Token non valide. Veuillez vous reconnecter.");
            navigate('/login');
            return; // Stoppe l'exécution du useEffect
        }
        // Récupération des données depuis la route API
        fetch(`${apiUrl}/api/diffusion`, {
            headers: {
                Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Erreur lors de la récupération des diffusions.");
                }
                return res.json();
            })
            .then((data) => setDiffusions(data))
            .catch((error) => setError(error.message));
    }, [apiUrl,token]);

    // Fonction pour supprimer une animation
    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette diffusion ?")) {
            fetch(`${apiUrl}/api/diffusion/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Erreur lors de la suppression de la diffusion.");
                    }
                    return res.json();
                })
                .then(() => {
                    setDiffusions((prevDiffusions) =>
                        prevDiffusions.filter((diffusion) => diffusion._id !== id)
                    );
                    toast.success("Diffusion supprimée avec succès !");
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Erreur lors de la suppression de la diffusion.");
                });
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            <aside className="w-full md:w-1/4 bg-gray-200">
                <BarreAdmin />
            </aside>
            <main className="flex-1 bg-gray-100 p-4 md:p-8">
                <h1 className="text-3xl font-bold text-center mb-6">Liste des diffusions</h1>

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
                                <th className="border border-gray-300 px-4 py-2 text-left">Id de l'animation</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Id de la chaine</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {diffusions.length > 0 ? (
                                diffusions.map((diffusion) => (
                                    <tr key={diffusion._id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{diffusion.animationId}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {diffusion.chaineId}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(diffusion._id)}
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
                                        Aucune diffusion trouvée.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Link to='/newDiffusion'>
                        <a>Ajouter une diffusion</a>
                    </Link>
            </main>
            
        </div>
    );
};

export default AllDiffusions;
