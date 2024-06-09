import { Heart, HomeIcon, LogIn, MenuIcon, ScrollText } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import CategoryListSheet from "./category-list-sheet";

const SheetMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <MenuIcon size={22} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex items-center justify-between pt-5">
          <h1 className=" font-semibold">Olá. Faça seu login!</h1>
          <Button size={"icon"}>
            <LogIn />
          </Button>
        </div>
        <div className="py-5">
          <Separator />
        </div>
        <div className="flex flex-col gap-4">
          <SheetClose asChild>
            <Button className="flex w-full items-center justify-start gap-3 rounded-3xl">
              <HomeIcon size={16} />
              Inicio
            </Button>
          </SheetClose>
          <SheetTrigger asChild>
            <Button
              className="flex w-full items-center justify-start gap-3 rounded-3xl"
              variant={"ghost"}
            >
              <ScrollText size={16} />
              Meus pedidos
            </Button>
          </SheetTrigger>
          <SheetTrigger asChild>
            <Button
              className="flex w-full items-center justify-start gap-3 rounded-3xl"
              variant={"ghost"}
            >
              <Heart size={16} />
              Restaurantes Favoritos
            </Button>
          </SheetTrigger>
        </div>
        <div className="py-5">
          <Separator />
        </div>
        
          <CategoryListSheet />
        
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
