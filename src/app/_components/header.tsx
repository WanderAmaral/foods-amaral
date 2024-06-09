import Link from "next/link";
import Image from "next/image";
import SheetMenu from "./sheet-menu";


const Header = () => {
  return (
    <div className="flex justify-between pt-6">
      <Link href="/">
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/logo.png"
            alt="FSW Foods"
            sizes="100%"
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <SheetMenu />
    </div>
  );
};

export default Header;
