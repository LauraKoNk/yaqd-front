import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [show, setShow] = useState(false);
    const toggleDropdown = () => {
        setShow(!show);
    }
    return (
        <nav className="text-black font-wallop-semibold">
        <div class="flex justify-between items-center mt-5 p-8 md:p-7">
            <div className="logo pl-2 md:pl-7">
                <Link to="/">
                    <img src="/assets/YAQD-logo.png" alt="Logo" class="h-14 md:h-20" />
                </Link>
            </div>
            <button id="burger-menu" type="button" class="md:hidden relative inline-flex  justify-center  p-2 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-Links-Mobile" aria-expanded="false" onClick={toggleDropdown}>
                <span class="absolute -inset-0.5"></span>
                <span class="sr-only">Open main menu</span>
                <svg class="block size-7" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg class="hidden size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>

            <div id="navbar-Links" className="hidden md:flex items-center gap-5 px-10 text-xl">
                <Link to="/">
                    Voir tout
                </Link>
                <Link to='/contact'>
                    Contact
                </Link>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                </button>
            </div>
        </div>
        {show && (<div id="navbar-Links-Mobile" className="md:hidden flex flex-col gap-2 border-2 rounded mx-8">
            <Link className="pl-2 py-2 hover:bg-gray-100 text-lg cursor-pointer" to="/">
                Voir tout
            </Link>
            <Link className="pl-2 py-2 hover:bg-gray-100 text-lg cursor-pointer" to='/contact'>
                Contact
            </Link>
        </div>)
        }
    </nav>
    );
};

export default Header