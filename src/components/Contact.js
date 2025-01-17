const Contact = () => {
    return (
        <>
        {/* Phrase entête */}
        <div className="mx-16 mt-28 flex justify-center gap-3 text-lg">
                Une question <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-indigo-400 transition-transform duration-300 ease-in-out hover:-translate-y-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
                Une suggestion <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-yellow-400 transition-transform duration-300 ease-in-out hover:-translate-y-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
                Un retour <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-emerald-400 transition-transform duration-300 ease-in-out hover:-translate-y-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
            </div>
            {/* Formulaire */}
            <div class="max-w-lg mx-auto p-6 mb-16">
                <h2 class="text-5xl font-wallop-semibold text-black text-center mt-4 mb-12">Contactez-nous</h2>
                <form name="contact" method="POST" class="space-y-6" data-netlify="true" onSubmit="submit">
                    <div>
                    <input type="hidden" name="form-name" value="contact" />
                        <label for="name" class="block text-sm font-medium text-gray-700">Je m'appelle</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Entrez votre nom"
                            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-700 focus:border-gray-700"
                        />
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Mon email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Entrez votre email"
                            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-700 focus:border-gray-700"
                        />
                    </div>

                    <div>
                        <label for="message" class="block text-sm font-medium text-gray-700">Mon message</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Écrivez votre message ici..."
                            rows="4"
                            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-700 focus:border-gray-700"
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            class="w-full font-semibold py-2 px-4 rounded-md bg-white text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white transition"
                        >
                            Envoyer
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}
export default Contact