import Image from "next/image";
import Logo from "../../../public/assets/t-preview.png"

const Header = () => {
    return (
        <div className="h-14 bg-gray-700 flex justify-center items-center gap-5">
            <Image src={Logo} height={300} width={35} alt="Logo" />
            <p className="font-extrabold text-xl font-sans">
                MuniTrack
            </p>

        </div>
    );
}

export default Header;