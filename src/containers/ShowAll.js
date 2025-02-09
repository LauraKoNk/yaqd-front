import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";
import SearchBar from "../components/SearchBar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { useState, useEffect } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const ShowAll = ({ theme, handleToTop }) => {
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

    const resetFilters = () => {
        setSelectedChaine(null);
        setSelectedGenre(null);
        setSearchTerm("");
    }


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

    // Couleurs pour filtres genres affichés
    const colorClasses = {
        "Action": "bg-red-200 text-red-700",
        "Aventure": "bg-lime-200 text-lime-700",
        "Comédie": "bg-yellow-200 text-yellow-800",
        "Drame": "bg-purple-200 text-purple-700",
        "Educatif": "bg-orange-200 text-orange-700",
        "Fantastique": "bg-amber-600 text-amber-950",
        "Fantaisie": "bg-fuchsia-200 text-fuchsia-700",
        "Musical": "bg-sky-200 text-sky-700",
        "Romance": "bg-pink-200 text-pink-700",
        "Science-fiction": "bg-indigo-200 text-indigo-700",
        "Sport": "bg-teal-200 text-teal-700",
        "Tranche de vie": "bg-cyan-200 text-cyan-700"
    };
    const genreClass = colorClasses[selectedGenre]

    return (
        <main className="mx-10">
            {/* Phrase YAQD */}
            <div className="font-spicyRice text-5xl md:text-6xl text-center mt-10 md:mt-28 space-y-2 lg:flex justify-center items-baseline">
                {theme === 'dark' ?
                    (<div className="text-white md:pr-2">Y'avait quoi déjà
                        {selectedChaine ? <span> {" "} sur</span> : ""}
                    </div>
                    ) : (<div className="text-white text-outline md:pr-2">Y'avait quoi déjà
                        {selectedChaine ? <span> {" "} sur</span> : ""}
                    </div>)}
                <div>
                    {selectedChaine ? (
                        <span className={
                            (selectedChaine === "Gulli" || selectedChaine === "France 5" || selectedChaine === "Piwi" || selectedChaine === "Disney XD")
                                ? "text-green-500"
                                : (selectedChaine === "Tf1" || selectedChaine === "M6" || selectedChaine === "Jetix")
                                    ? "text-red-500"
                                    : (selectedChaine === "France 4" || selectedChaine === "Disney Channel")
                                        ? "text-purple-500"
                                        : (selectedChaine === "France 3" || selectedChaine === "Tiji") ?
                                            "text-blue-400"
                                            : (selectedChaine === "Canal J" || selectedChaine === "Teletoon+" | selectedChaine === "Nickelodeon") ?
                                                "text-orange-400"
                                                : "text-gray-400"}>
                            {selectedChaine} {" "}
                        </span>
                    ) :
                        <span className="bg-gradient-to-r from-fuchsia-500 via-yellow-400
                    to-cyan-500 text-transparent bg-clip-text mx-2">
                            à la télé
                        </span>
                    }
                    {theme === 'dark' ? <span className="text-white pl-1">?
                    </span> : <span className="text-white text-outline pl-1">?</span>}
                </div>
            </div>

            {/* Menus déroulants + barre de recherche */}
            <div className="container mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="relative">
                        {/* Menu déroulant des chaines */}
                        <button
                            className="w-full bg-general-bg text-filters-title py-2 px-4 rounded border border-general-border focus:outline-none focus:shadow-outline flex items-center justify-between dropdown-button"
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
                        <div className={`absolute w-full mt-1 rounded bg-general-bg border border-filters-border 
    text-filters-selected-title shadow-lg dropdown-menu z-10
    transition-all duration-300 ease-in-out
    ${isChainesOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}
  `}>
                            <ul>
                                {chaines.map((chaine) => (
                                    <li
                                        key={chaine._id}
                                        className="py-2 px-4 hover:bg-general-hover cursor-pointer"
                                        onClick={() => { handleClickedChannel(chaine); setIsChainesOpen(false); handleToTop() }}>
                                        {chaine.nom}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Menu déroulant des genre */}
                    <div className="relative">
                        <button
                            className="w-full bg-general-bg text-filters-title py-2 px-4 rounded border border-general-border focus:outline-none focus:shadow-outline flex items-center justify-between dropdown-button"
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
                        <div className={`absolute w-full mt-1 rounded bg-general-bg border border-filters-border 
    text-filters-selected-title shadow-lg dropdown-menu z-10
    transition-all duration-300 ease-in-out
    ${isGenresOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
  `}>
                            <ul>
                                <li
                                    className="py-2 px-4 hover:bg-general-hover cursor-pointer"
                                    onClick={() => { handleClickedGenre("Action"); setIsGenresOpen(false); handleToTop() }}>Action</li>
                                <li
                                    className="py-2 px-4 hover:bg-general-hover cursor-pointer"
                                    onClick={() => { handleClickedGenre("Aventure"); setIsGenresOpen(false); handleToTop() }}>Aventure</li>
                                <li
                                    className="py-2 px-4 hover:bg-general-hover cursor-pointer"
                                    onClick={() => { handleClickedGenre("Comédie"); setIsGenresOpen(false); handleToTop() }}>Comédie</li>
                                <li
                                    className="py-2 px-4 hover:bg-general-hover cursor-pointer"
                                    onClick={() => { handleClickedGenre("Drame"); setIsGenresOpen(false); handleToTop() }}>Drame</li>
                                <li
                                    className="py-2 px-4 hover:bg-general-hover cursor-pointer"
                                    onClick={() => { handleClickedGenre("Educatif"); setIsGenresOpen(false); handleToTop() }}>Educatif</li>
                                <li
                                    className="py-2 px-4 hover:bg-general-hover cursor-pointer"
                                    onClick={() => { handleClickedGenre("Fantaisie"); setIsGenresOpen(false); handleToTop() }}>Fantaisie</li>
                                <li
                                    className="py-2 px-4 hover:bg-general-hover cursor-pointer"
                                    onClick={() => { handleClickedGenre("Fantastique"); setIsGenresOpen(false); handleToTop() }}>Fantastique</li>
                                <li
                                    className="py-2 px-4 hover:bg-general-hover cursor-pointer"
                                    onClick={() => { handleClickedGenre("Musical"); setIsGenresOpen(false); handleToTop() }}>Musical</li>
                                <li
                                    className="py-2 px-4 hover:bg-general-hover cursor-pointer"
                                    onClick={() => { handleClickedGenre("Romance"); setIsGenresOpen(false); handleToTop() }}>Romance</li>
                                <li
                                    className="py-2 px-4 hover:bg-general-hover cursor-pointer"
                                    onClick={() => { handleClickedGenre("Science-fiction"); setIsGenresOpen(false); handleToTop() }}>Science-fiction</li>
                                <li
                                    className="py-2 px-4 hover:bg-general-hover cursor-pointer"
                                    onClick={() => { handleClickedGenre("Sport"); setIsGenresOpen(false); handleToTop() }}>Sport</li>
                                <li
                                    className="py-2 px-4 hover:bg-general-hover cursor-pointer"
                                    onClick={() => { handleClickedGenre("Tranche de vie"); setIsGenresOpen(false); handleToTop() }}>Tranche de vie</li>
                            </ul>
                        </div>
                    </div>
                    <SearchBar
                        goSearch={handleSearch} chaine={selectedChaine} genre={selectedGenre}
                    />
                </div>
            </div>
            {/* Filtres affichés */}
            <div className="mt-10 md:px-8">
                {(selectedChaine || selectedGenre || searchTerm) && (
                    <div className="flex justify-between items-baseline w-full font-medium text-sm md:text-lg">
                        <div className="flex items-center gap-2">
                            <svg className="text-filters-title" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" fill="currentColor">
                                <path d="M10 18h4a1 1 0 0 0 0-2h-4a1 1 0 1 0 0 2zm-4-6h12a1 1 0 0 0 0-2H6a1 1 0 0 0 0 2zm16-7a1 1 0 0 0-1-1H3a1 1 0 1 0 0 2h18a1 1 0 0 0 1-1z" />
                            </svg>
                            <span className="text-title-color">Filtres :</span>
                        </div>
                        <button className="text-sm text-filters-selected-title md:text-base px-2 py-1 md:py-2 md:px-4 bg-general-bg border rounded-full" onClick={resetFilters}>
                            Supprimer les filtres
                        </button>
                    </div>
                )}

                <div className="flex flex-col md:flex-row items-start gap-3 mt-3">
                    {selectedChaine && (
                        <div className="flex justify-between px-3 py-1 bg-general-bg rounded-full border gap-2 max-w-xs text-filters-selected-title">
                            <span className="font-wallop-medium truncate">{selectedChaine}</span>
                            <button onClick={() => setSelectedChaine(null)}>
                                <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                    {selectedGenre && (
                        <div className={`flex justify-between px-3 py-1 rounded-full gap-2 max-w-xs ${genreClass}`}>
                            <span className="font-wallop-medium truncate">{selectedGenre}</span>
                            <button onClick={() => setSelectedGenre(null)}>
                                <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {searchTerm && (
                    <div className="flex justify-between mt-3 px-3 py-3 text-sm md:text-base bg-general-bg rounded-full border gap-2 max-w-xs text-filters-selected-title">
                        <span className="truncate">Ma recherche : {searchTerm}</span>
                        <button onClick={() => setSearchTerm("")}>
                            <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            {/* Bulles animations  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 text-center my-24">
                {loading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <SkeletonCard key={index} />  // Affiche les skeleton cards
                    ))
                    : filteredAndSearchedDiffusions.length > 0 ? (filteredAndSearchedDiffusions.map((diffusion) => (
                        <Card key={diffusion._id} diffusion={diffusion} />
                    ))) : <div className="flex items-center justify-center col-span-full mb-7 gap-3">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-title-color">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        <p className="text-xl text-title-color font-semibold">Aucun résultat trouvé</p>
                    </div>}
            </div>
            <ScrollToTopButton />
        </main>
    );
};

export default ShowAll