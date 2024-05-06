import Logo from "../../../../public/assets/t-preview.png";
import Image from "next/image";

export default function Splash() {
  return (
    <div className="h-[90vh] img6 flex flex-col justify-center items-center bg-gray-300">
      <Image src={Logo} height={300} width={250} alt="Logo" className="animate-pulse" />
      <p className="font-extrabold text-4xl font-sans text-green-700">MuniTrack</p>
    </div>
  );
}
