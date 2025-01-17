
const CardModal = ({ setShow, diffusion }) => {

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div
                className="bg-white max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 border-2 border-gray-300/50 
            rounded-lg shadow-md flex flex-col"
            >
                {/* Bouton de fermeture */}
                <button
                    type="button"
                    className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 p-2 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={(e) => {
                        setShow(false);
                        e.stopPropagation();
                    }}
                >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>

                {/* Bloc image et titre */}
                <div className="flex justify-evenly items-center mb-6">
                    <img
                        className="object-cover w-40 h-40 rounded-full shadow-md mb-4"
                        src={diffusion.image}
                        alt="image"
                    />
                    <h1
                        className="text-3xl font-wallop-semibold text-center break-words"
                    >
                        {diffusion.titre}
                    </h1>
                </div>


                {/* Informations détaillées */}
                <div className="w-full text-left space-y-3">
                    <div className="flex">
                        {diffusion.genre.map((genre, index) => {
                            const colorClasses = {
                                "Action": "bg-red-200 text-red-700",
                                "Amitié": "bg-purple-200 text-purple-700",
                                "Aventure": "bg-green-200 text-green-700",
                                "Comédie": "bg-yellow-200 text-yellow-800",
                                "Educatif": "bg-orange-200 text-orange-700",
                                "Fantastique": "bg-amber-600 text-amber-950",
                                "Fantaisie": "bg-pink-200 text-pink-700",
                                "Science-fiction": "bg-indigo-200 text-indigo-700"
                            };
                            const genreClass = colorClasses[genre] || "bg-orange-200 text-orange-700";

                            return (
                                <span
                                    key={index}
                                    className={`px-4 py-1 mx-1 rounded-full ${genreClass} text-sm font-wallop-medium`}
                                >
                                    {genre}
                                </span>
                            );
                        })}
                    </div>
                    <div className="flex">
                        <p className="font-wallop-medium text-lg">
                            <span className="font-wallop-semibold text-lg mr-2">Année :</span>
                            {diffusion.annee_premiere_diffusion}
                        </p>
                    </div>
                    <div className="flex">
                        <p className="font-wallop-medium text-lg">
                            <span className="font-wallop-semibold text-lg mr-2">Chaîne(s) :</span>
                            {diffusion.chaines.join(', ')}
                        </p>
                    </div>
                    <div className="flex">
                        <p className="font-wallop-medium text-lg">
                            <span className="font-wallop-semibold text-lg mr-2">Format :</span>
                            {diffusion.format}
                        </p>
                    </div>
                     <div className="flex">
                        <p className="font-wallop-medium text-lg">
                            <span className="font-wallop-semibold text-lg mr-2">Pays :</span>
                            {diffusion.pays.join(', ')}
                        </p>
                    </div>
                    <div className="flex">
                        <p className="font-wallop-medium text-lg">
                            <span className="font-wallop-semibold text-lg mr-2">Studio :</span>
                            {diffusion.studio}
                        </p>
                    </div>
                    <div className="flex">
                        <p className="font-wallop-medium text-lg">
                            <span className="font-wallop-semibold text-lg mr-2">Synopsis :</span>
                            {diffusion.synopsis}
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CardModal;
