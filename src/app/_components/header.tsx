import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between pt-6">
      <Link href={"/"}>
        <h1 className="text-xl font-bold uppercase text-red-500">fsw foods</h1>
      </Link>
      <Button size={"icon"} variant={"outline"}>
        <MenuIcon size={30} />
      </Button>
    </div>
  );
};

export default Header;
