import { useState } from "react";
import CardModal from "./CardModal";

const Card = ({ diffusion }) => {
    const [show, setShow] = useState(false);
    // console.log(diffusion);

    return (
        <>
            {/* Item 1 */}
            <div>
                <div class="w-40 h-40 rounded-full overflow-hidden mx-auto shadow-lg cursor-pointer"
                    onClick={() => {
                        setShow(true)
                        console.log("ouvert")
                    }}
                >
                    <img
                        src={diffusion.image}
                        class="object-cover w-full h-full"
                    />
                </div>
                <h2 class="mt-4 text-lg font-wallop-medium text-black">{diffusion.titre}</h2>
                {show && <CardModal setShow={setShow} diffusion={diffusion} />}
            </div>
        </>
    );
};

export default Card