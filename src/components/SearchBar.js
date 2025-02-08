import { useState } from "react";

const SearchBar = ({ goSearch, chaine, genre }) => {

    const [input, setInput] = useState("");
    const [showPopover, setShowPopover] = useState(false);

    return (
        <form className="flex"
            onSubmit={event => {
                event.preventDefault();
                goSearch(input);
            }}
        >
            <input
                type="text"
                placeholder="Quel programme recherches-tu ?"
                className="w-full bg-general-bg text-filters-title text-xs md:text-sm sm:text-base py-2 px-4 rounded border border-general-border focus:border-ring-color focus:outline-none focus:shadow-outline"
                value={input}
                onChange={event => {
                    setInput(event.target.value);
                }}
                onClick={() => setShowPopover(true)}
                onBlur={() => setShowPopover(false)}
            />
            {(chaine || genre) && showPopover && <div className="absolute mt-14 z-10 inline-block w-64 text-sm font-medium bg-general-bg border border-form-border text-title-color transition-opacity duration-300 rounded-lg shadow-sm">
                <div className="relative">
                    {/* Flèche du popover */}
                    <div className="absolute -top-2 left-1/4 transform -translate-x-1/2 w-3.5 h-3.5 bg-general-bg border-l border-t border-form-border rotate-45"></div>
                </div>
                <div className="px-4 py-6">
                    <p>Supprime les filtres pour plus de résultats.</p>
                </div>
            </div>
            }
            <button type="submit" class=" p-3 ms-2 text-sm font-medium bg-general-bg text-filters-title rounded-lg border border-general-border focus:outline-none focus:shadow-outline">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">Search</span>
            </button>
        </form>
    );
};

export default SearchBar;