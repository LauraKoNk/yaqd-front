const Contact = () => {
    return (
        <>
            <div class="max-w-lg mx-auto p-6 border-2 border-gray-300/50 rounded-lg shadow-md">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Contactez-nous</h2>
                <form method="POST" class="space-y-6" data-netlify="true" onSubmit="submit">
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