import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Assurez-vous que react-toastify est installé et configuré
import "react-toastify/dist/ReactToastify.css"; // Styles pour react-toastify
import BarreAdmin from "../administration/BarreAdmin";
import { useNavigate } from "react-router-dom";

const AllChaines = () => {
    const [chaines, setChaines] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Récupère le token
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        if (!token) {
            toast.error("Token non valide. Veuillez vous reconnecter.");
            navigate('/login');
            return; // Stoppe l'exécution du useEffect
        }
        // Récupération des données depuis la route API
        fetch(`${apiUrl}/api/chaine`, {
            headers: {
                Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Erreur lors de la récupération des chaines.");
                }
                return res.json();
            })
            .then((data) => setChaines(data))
            .catch((error) => setError(error.message));
    }, [apiUrl,token]);

    // Fonction pour supprimer une animation
    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette chaine ?")) {
            fetch(`${apiUrl}/api/chaine/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Erreur lors de la suppression de la chaine.");
                    }
                    return res.json();
                })
                .then(() => {
                    setChaines((prevChaines) =>
                        prevChaines.filter((chaine) => chaine._id !== id)
                    );
                    toast.success("Chaine supprimée avec succès !");
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Erreur lors de la suppression de la chaine.");
                });
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            <aside className="w-full md:w-1/4 bg-gray-200">
                <BarreAdmin />
            </aside>
            <main className="flex-1 bg-gray-100 p-4 md:p-8">
                <h1 className="text-3xl font-bold text-center mb-6">Liste des chaines</h1>

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
                                <th className="border border-gray-300 px-4 py-2 text-left">Nom de la chaine</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Modifier</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chaines.length > 0 ? (
                                chaines.map((chaine) => (
                                    <tr key={chaine._id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{chaine.nom}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <Link
                                                to={`/editChaine/${chaine._id}`}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Modifier
                                            </Link>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(chaine._id)}
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
                                        Aucune chaine trouvée.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Link to='/newChaine'>
                        <a>Ajouter une chaine</a>
                    </Link>
            </main>
            
        </div>
    );
};

export default AllChaines;
