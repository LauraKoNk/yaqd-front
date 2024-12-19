import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useState, useEffect } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const ShowAll = () => {
    const [diffusions, setDiffusions] = useState([]);
    const [chaines, setChaines] = useState([]);
    const [selectedChaine, setSelectedChaine] = useState(null);

    useEffect(() => {
        // Récupération des diffusions
        fetch(`${apiUrl}/api/diffusion/filtre`) // Appel à l'API
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des diffusions');
                }
                return response.json();
            }) // Convertit la réponse en JSON
            .then((data) => {
                // console.log('Diffusions reçues:', data.diffusions);
                setDiffusions(data.diffusions || []); // Met à jour l'état avec la propriété diffusions
            })
            .catch((error) => console.error('Erreur lors du chargement des diffusions:', error));

        // Récupération des chaines
        fetch(`${apiUrl}/api/chaine/filtre`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des chaines');
                }
                return response.json();
            })
            .then((data) => setChaines(data))
            .catch((error) => console.error('Erreur lors du chargement des chaines:', error));
    }, [apiUrl]);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickedChannel = (clickedChannel) => {
        setSelectedChaine(clickedChannel.nom); // Stocke l'id de la chaîne sélectionnée
        console.log("id de la chaine selected :", clickedChannel._id);
    };

    const filteredDiffusions = diffusions.filter((diffusion) =>
        diffusion.chaines.includes(selectedChaine) // Vérifie si selectedChaine est présent dans chaines
    );

    console.log(diffusions);


    return (
        <main className="mx-10">
            {/* Phrase YAQD */}
            <div className="text-center mt-28">
                <p className="font-spicyRice text-5xl text-white text-outline">Y'avait quoi déjà
                {
                selectedChaine ? <span className={
                    selectedChaine === "Gulli"
                        ? "text-#41f04b"
                        : selectedChaine === "Tf1"
                        ? "text-red-500"
                        : "text-gray-500"
                }> sur {selectedChaine}</span> : <span className="bg-gradient-to-r from-fuchsia-500 via-yellow-400
            to-cyan-500
            text-transparent bg-clip-text"> à la télé</span>
                }
                    
                    ?</p>
            </div>
            {/* Filtrage + barre de recherche */}
            <div>
                <div className="flex gap-5 mt-10">
                    <h2 className="text-xl font-normal mb-4">Filtrer par :</h2>
                    <div className="relative">
                        <button
                            className="w-full text-gray-700 py-2 px-4 rounded border border-gray-200 focus:outline-none focus:shadow-outline flex items-center justify-between dropdown-button"
                            type="button"
                            onClick={toggleDropdown}
                        >
                            Chaines
                            <svg
                                className={`w-4 h-4 ml-2 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"
                                    }`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Menu déroulant */}
                        {isOpen && (
                            <div className="absolute w-full mt-1 rounded bg-white shadow-lg dropdown-menu">
                                <ul>
                                    {chaines.map((chaine) => (
                                        <li
                                            key={chaine._id}
                                            className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleClickedChannel(chaine)}>
                                            {chaine.nom}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Bulles animations  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center mt-32">
                {(selectedChaine
                    ? filteredDiffusions // Si une chaîne est sélectionnée, affiche les diffusions filtrées
                    : diffusions // Sinon, affiche toutes les diffusions
                ).map((diffusion) => (
                    <Card key={diffusion._id} diffusion={diffusion} />
                ))}
            </div>
        </main>
    );
};

export default ShowAll