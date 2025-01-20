import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
    const [showGoTop, setShowGoTop] = useState(false)

    const handleVisibleButton = () => {
        setShowGoTop(window.scrollY > 50)
    }

    const handleScrollUp = () => {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        const handleVisibleButton = () => {
            setShowGoTop(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleVisibleButton);
        return () => {
            window.removeEventListener('scroll', handleVisibleButton);
        };
    }, []);


    return (
        <div>
            {showGoTop && (
                <button type="button" onClick={handleScrollUp} aria-expanded="false" className="fixed bottom-6 right-6 flex items-center justify-center text-gray-700 border border-gray-700 rounded-full w-12 h-12  focus:ring-4 focus:ring-zinc-300 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7-7-7 7" />
                    </svg>
                    <span className="sr-only">Scroll to top</span>
                </button>
            )}
        </div>
    )
}

export default ScrollToTopButton