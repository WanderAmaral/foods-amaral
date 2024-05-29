import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex justify-between pt-6">
      <h1 className="text-xl font-bold uppercase text-red-400">fsw foods</h1>
      <Button
        size={"icon"}
        variant={"outline"}
        className="border-none bg-transparent"
      >
        <MenuIcon size={30} />
      </Button>
    </div>
  );
};

export default Header;
