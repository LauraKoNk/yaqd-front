import { Link } from "react-router-dom";

const BarreAdmin = () => {
    return (
        <>
            <div class="container mx-auto">
                <div class="flex flex-col md:flex-row">
                    <aside class="w-full md:w-72 border-l border-gray-200 pl-6 pt-6">
                        <div class="flex items-center mb-4">
                                <h1 class="text-xl font-semibold text-black ml-2">Administration</h1>
                        </div>
                        <div class="p-4">
                            <ul class="space-y-2">
                                <li>
                                    <Link to='/allAnimation' class="flex items-center text-blue-600 hover:text-blue-800"> Toutes les Animations </Link>
                                </li>
                                <li>
                                <Link to='/allChaine' class="flex items-center text-blue-600 hover:text-blue-800"> Toutes les Chaines </Link>
                                </li>
                                <li>
                                <Link to='/allDiffusion' class="flex items-center text-blue-600 hover:text-blue-800"> Toutes les Diffusions </Link>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>

        </>
    )
}

export default BarreAdmin