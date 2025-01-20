import { useState } from "react";

const SearchBar = ({ goSearch }) => {

    const [input, setInput] = useState("");


    return (
            <form className="flex"
                onSubmit={event => {
                    event.preventDefault();
                    goSearch(input);
                }}
            >
                 <input
                    type="text"
                    placeholder="Que recherches-tu ?"
                    className="w-full bg-general-bg text-filters-title py-2 px-4 rounded border border-general-border focus:border-ring-color focus:outline-none focus:shadow-outline"
                    value={input}
                    onChange={event => {
                        setInput(event.target.value);
                    }}
                />
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