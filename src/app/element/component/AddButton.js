import Image from "next/image";
import AnimeIcon from "../../../../public/assets/addicon.png";
import Link from "next/link";
export default function AddButton() {
  return (
    <div className="sticky bottom-10">
      <div className="flex justify-end ">
        <Link
          href={"/add"}
          className="sticky bottom-20 right-10 hidden md:block"
        >
          <Image
            src={AnimeIcon}
            height={70}
            width={70}
            alt="Add"
            className="cursor-pointer transition-all"
          />
        </Link>
      </div>
    </div>
  );
}
