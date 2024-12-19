
const CardModal = ({ setShow, diffusion }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white max-w-lg p-12 border-2 border-gray-300/50 rounded-lg shadow-md flex 
                flex-col items-start">
                <button
                    onClick={(e) => {
                        setShow(false);
                        e.stopPropagation();
                    }}
                    className="ml-auto p-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M18.36 5.64L12 12l6.36 6.36a1 1 0 0 0 0-1.42L13.42 12l5.94-5.94a1 1 0 0 0-1.42-1.42zM5.64 5.64a1 1 0 0 0-1.42 1.42L10.58 12l-6.36 6.36a1 1 0 1 0 1.42 1.42L12 13.42l6.36 6.36a1 1 0 0 0 1.42-1.42L13.42 12l5.94-5.94a1 1 0 0 0-1.42-1.42L12 10.58z" />
                    </svg>
                </button>
                <div className="grid grid-cols-2 items-center gap-4">
                    <img className="object-cover w-32 h-32 rounded-full shadow-md" src={diffusion.image} alt="image" />
                    <h1 className="text-2xl font-wallop-semibold">{diffusion.titre}</h1>
                </div>
                <div className="">
                    <p className="font-wallop-semibold">Chaînes :</p>
                    <p className="font-wallop-medium">{diffusion.chaines.join(', ')}</p>

                    <p className="font-wallop-semibold">Année :</p>
                    <p className="font-wallop-medium">{diffusion.annee_premiere_diffusion}</p>

                    <p className="font-wallop-semibold">Studio :</p>
                    <p className="font-wallop-medium">{diffusion.studio}</p>

                    <p className="font-wallop-semibold">Pays :</p>
                    <p className="font-wallop-medium">{diffusion.pays.join(', ')}</p>

                    <p className="font-wallop-semibold">Genre :</p>
                    <p className="font-wallop-medium">{diffusion.genre.join(', ')}</p>

                    <p className="font-wallop-semibold">Format :</p>
                    <p className="font-wallop-medium">{diffusion.format}</p>

                    <p className="font-wallop-semibold">Synopsis :</p>
                    <p className="font-wallop-medium">{diffusion.synopsis}</p>

                    <p className="font-wallop-semibold">Où voir :</p>
                    <p className="font-wallop-medium">{diffusion.lien}</p>
                </div>
            </div>
        </div>

    );
};

export default CardModal;
