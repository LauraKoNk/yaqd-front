import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [show, setShow] = useState(false);
    return (
        <nav className="bg-white text-black font-wallop-semibold">
            <div class="md:flex justify-between p-7">
                <div className="logo pl-9">
                    <Link to="/">
                      <img src="/assets/YAQD-logo.png" alt="Logo" class="h-20" />
                    </Link>
                </div>
                <button id="burger-menu" type="button" class=" md:hidden relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="navbar-Links-Mobile" aria-expanded="false" onClick={() => {
                        setShow(true)
                        console.log("ouvert")
                    }}>
                    <span class="absolute -inset-0.5"></span>
                    <span class="sr-only">Open main menu</span>
                    {/* <!--
                    Icon when menu is closed.

                    Menu open: "hidden", Menu closed: "block"
          --> */}
                    <svg class="block size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    {/* <!--
                    Icon when menu is open.

                    Menu open: "block", Menu closed: "hidden"
          --> */}
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
                </div>
                {
                    show && <div id="navbar-Links-Mobile" className="md:hidden flex flex-col gap-3 border-2">
                    <a href="#">Voir tout</a>
                    <a href="#">A propos</a>
                    <a href="#">Contact</a>
                </div>
                }
                
            </div>
        </nav>
    );
};

export default Header