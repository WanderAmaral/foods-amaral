import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <h1 className="text-xl font-bold text-red-400 uppercase">fsw foods</h1>
      <Button size={'icon'} variant={'outline'} className="border-none bg-transparent">
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
