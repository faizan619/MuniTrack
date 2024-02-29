import Image from "next/image";
import AnimeIcon from "../../../../public/assets/addicon.png";
import Link from "next/link";
export default function AddButton() {
  return (
    <Link href={"/add"} className="absolute bottom-6 right-6 hidden md:block">
      <Image
        src={AnimeIcon}
        height={70}
        width={70}
        className="cursor-pointer hover:scale-105 transition-all"
      />
    </Link>
  );
}
