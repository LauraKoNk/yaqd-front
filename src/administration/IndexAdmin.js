import BarreAdmin from "./BarreAdmin"

const IndexAdmin = () => {
    return (
        <>
            <div class="flex flex-col md:flex-row">
                <aside class="w-full md:w-1/4 bg-gray-200">
                    <BarreAdmin />
                </aside>
                <main class="flex-1 bg-gray-100 p-4 md:p-8">
                    <h1 class="text-3xl font-bold mb-8">Bienvenue sur la plateforme d'administration</h1>
                </main>
            </div>
        </>
    )
}

export default IndexAdmin