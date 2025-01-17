import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const ShowAll = () => {
    const [diffusions, setDiffusions] = useState([]);
    const [chaines, setChaines] = useState([]);
    const [selectedChaine, setSelectedChaine] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [isChainesOpen, setIsChainesOpen] = useState(false);
    const [isGenresOpen, setIsGenresOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

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
                setLoading(false);  // Désactive le chargement après réception des données
            })
            .catch((error) => {
                console.error('Erreur lors du chargement des diffusions:', error)
                setLoading(false);
            }
            );

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

    const toggleDropdownChaines = () => {
        setIsChainesOpen(!isChainesOpen);
    };

    const toggleDropdownGenres = () => {
        setIsGenresOpen(!isGenresOpen);
    };

    const handleClickedChannel = (clickedChannel) => {
        setSelectedChaine(clickedChannel.nom);
    };

    const handleClickedGenre = (genre) => {
        setSelectedGenre(genre);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredAndSearchedDiffusions = diffusions.filter((diffusion) => {
        if (selectedChaine && selectedGenre) {
            return diffusion.chaines.includes(selectedChaine) && diffusion.genre.includes(selectedGenre);
        } else if (selectedChaine) {
            return diffusion.chaines.includes(selectedChaine);
        } else if (selectedGenre) {
            return diffusion.genre.includes(selectedGenre);
        }
        else if (searchTerm) {
            return diffusion.titre.toLowerCase().includes(searchTerm.toLowerCase());
        }

        // Si aucun filtre n'est défini, on retourne toutes les diffusions
        return true;
    });


    return (
        <main className="mx-10">
            {/* Phrase YAQD */}
            <div className="text-center mt-28">
                <p className="font-spicyRice text-6xl text-white">
                    <span className="text-outline mx-1">
                        Y'avait quoi déjà
                    </span>
                    {
                        selectedChaine ? (
                            <span className={
                                (selectedChaine === "Gulli" || selectedChaine === "France 5" || selectedChaine === "Piwi")
                                    ? "text-green-500"
                                    : (selectedChaine === "Tf1" || selectedChaine === "M6" || selectedChaine === "Jetix")
                                        ? "text-red-500"
                                        : selectedChaine === "France 4"
                                            ? "text-purple-500"
                                            : (selectedChaine === "France 3" || selectedChaine === "Tiji") ?
                                                "text-blue-400"
                                                : (selectedChaine === "Canal J" || selectedChaine === "Teletoon+") ?
                                                    "text-orange-400"
                                                    : "text-gray-500"
                            }>
                                {" "}sur {selectedChaine} {" "}
                            </span>
                        ) : (
                            <span className="bg-gradient-to-r from-fuchsia-500 via-yellow-400
                    to-cyan-500 text-transparent bg-clip-text mx-2">
                                à la télé
                            </span>
                        )
                    }
                    <span className="text-outline">?</span>
                </p>
            </div>


            {/* Menus déroulants + barre de recherche */}
            <div className="container mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        {/* Menu déroulant des chaines */}
                        <button
                            className="w-full text-gray-700 py-2 px-4 rounded border border-gray-200 focus:outline-none focus:shadow-outline flex items-center justify-between dropdown-button"
                            type="button"
                            onClick={toggleDropdownChaines}
                        >
                            Chaines
                            <svg
                                className={`w-4 h-4 ml-2 transform transition-transform ${isChainesOpen ? "rotate-180" : "rotate-0"
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
                        {isChainesOpen && (
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
                    {/* Menu déroulant des genre */}
                    <div className="relative">
                        <button
                            className="w-full text-gray-700 py-2 px-4 rounded border border-gray-200 focus:outline-none focus:shadow-outline flex items-center justify-between dropdown-button"
                            type="button"
                            onClick={toggleDropdownGenres}
                        >
                            Genres
                            <svg
                                className={`w-4 h-4 ml-2 transform transition-transform ${isGenresOpen ? "rotate-180" : "rotate-0"
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
                        {isGenresOpen && (
                            <div className="absolute w-full mt-1 rounded bg-white shadow-lg dropdown-menu">
                                <ul>
                                    <li
                                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleClickedGenre("Action")}>Action</li>
                                    <li
                                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleClickedGenre("Amitié")}>Amitié</li>
                                    <li
                                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleClickedGenre("Aventure")}>Aventure</li>
                                    <li
                                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleClickedGenre("Comédie")}>Comédie</li>
                                    <li
                                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleClickedGenre("Educatif")}>Educatif</li>
                                    <li
                                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleClickedGenre("Fantaisie")}>Fantaisie</li>
                                    <li
                                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleClickedGenre("Fantastique")}>Fantastique</li>
                                    <li
                                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleClickedGenre("Science-fiction")}>Science-fiction</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <SearchBar
                        goSearch={handleSearch}
                    />
                </div>
            </div>


            {/* Bulles animations  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center my-28">
                {loading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <SkeletonCard key={index} />  // Affiche les skeleton cards
                    ))
                    : filteredAndSearchedDiffusions.length > 0 ? (filteredAndSearchedDiffusions.map((diffusion) => (
                        <Card key={diffusion._id} diffusion={diffusion} />
                    ))) : <div className="flex items-center justify-center col-span-full mb-7 gap-3">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        <p className="text-xl font-semibold">Aucun résultat trouvé</p>
                    </div>}
            </div>
        </main>
    );
};

export default ShowAll