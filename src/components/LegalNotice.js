import { Link } from "react-router-dom";
const LegalNotice = () => {
    return (
        <main className="mx-16 gap-9 flex flex-col justify-center items-center">
            <div className="text-center mt-10 font-wallop-semibold text-3xl">
                <h1>Mentions légales</h1>
            </div>
            <div className="bg-white max-w-lg overflow-y-auto max-h-[80vh] mb-10 p-12 border-2 border-gray-300/50 rounded-lg shadow-md">
                {/* Informations générales */}
                <div className="my-4 font-wallop-medium text-xl">
                    <h2>Informations générales</h2>
                </div>
                <div className="flex">
                    <span className="font-medium mx-3">Nom du site :</span>
                    yaqd
                </div>
                <div className="flex">
                    <span className="font-medium mx-3">Propriétaire :</span>
                    <a className="hover:underline" href="https://www.linkedin.com/in/laura-kokonyange-nkasei-b8b4831a1/">Laura Kokonyange-Nkasei</a>
                </div>
                <div className="flex">
                    <span className="font-medium mx-3">Localisation :</span>
                    Ile-de-France, France
                </div>
                {/* Hébergement */}
                <div className="my-8 font-wallop-medium text-xl">
                    <h2>Hébergement du site</h2>
                </div>
                <div className="flex">
                    <span className="font-medium mx-3">Nom de l'hébergeur :</span>
                    Netlify
                </div>
                <div className="flex">
                    <span className="font-medium mx-3">Adresse :</span>
                    San Francisco Californie, Etats-Unis
                </div>
                <div><a className="underline mx-3" href="https://www.netlify.com/">https://www.netlify.com/</a></div>
                {/* Propriété intellectuelle */}
                <div className="my-8 font-wallop-medium text-xl">
                    <h2>Propriété intellectuelle</h2>
                </div>
                <div className="mb-4 mx-3">
                    Les images, descriptions, et tout autre contenu relatifs aux programmes télévisés présent sur le site sont la propriété de leurs détenteurs respectifs. <br></br>
                    Ce site est uniquement à but informatif et divertissant. Il n'est aucunement à visée commerciale.
                </div>
                <div className="mx-3">
                    Les logos, et le design du site sont la propriété du propriétaire du site. Toute reproduction ou utilisation non autorisée de ces contenus est interdite, sauf autorisation écrite de Laura Kokonyange-Nkasei.
                </div>
                {/* Responsabilité */}
                <div className="my-8 font-wallop-medium text-xl">
                    <h2>Responsabilité</h2>
                </div>
                <div className="mx-3">
                    <div className="mb-4 mx-3">
                        Le propriétaire du site décline toute responsabilité quant à l’exactitude des informations présentes sur les programmes télévisés.
                        Ce site est fourni « tel quel » sans garantie d’aucune sorte.
                    </div>
                    <div className="mx-3">
                        Un <Link className="underline" to='/contact'>formulaire de contact</Link>  est à la disposition des utilisateurs qui souhaiteraient apporter des précisions ou des éléments supplémentaires concernant les informations actuellement disponibles.
                    </div>
                </div>

                {/* Données personnelles */}
                <div className="my-8 font-wallop-medium text-xl">
                    <h2>Données personnelles</h2>
                </div>
                <div className="mx-3 mb-4">
                    Les informations collectées via le formulaire de contact (nom et adresse email) sont utilisées uniquement pour répondre aux messages des utilisateurs. <br></br> De ce fait :
                </div>
                <div className="mx-3">
                    <ul>
                        <li className="mb-2">- Aucune donnée personnelle n’est partagée avec des tiers</li>
                        <li>- Conformément au Règlement Général sur la Protection des Données (RGPD), les utilisateurs peuvent demander la suppression de leurs données personnelles par mail à l’adresse : <a className="hover:underline font-medium" href="mailto:l.kokonyange@gmail.com">l.kokonyange@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <div className="mb-10 font-medium">
                <p className="text-gray-500">Version du 17 Janvier 2025.</p>
            </div>
        </main>
    )
}

export default LegalNotice