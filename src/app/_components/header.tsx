"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  HomeIcon,
  LogIn,
  Mail,
  MenuIcon,
  ScrollText,
  Github,
  LogOut,
} from "lucide-react";
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
import { signIn, signOut, useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from "next/navigation";
import { cn } from "../_lib/utils";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const { data, status } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleClickLogIn = () => {
    signIn();
  };

  const handleClickLogOut = () => {
    signOut();
  };

  return (
    <div className={cn("border-b pt-6", className)}>
      <div className="flex items-center justify-between  md:container  md:py-2">
        <Link href="/">
          <div className="relative h-[30px] w-[100px]">
            <Image
              src="/logo.png"
              alt="FSW Foods"
              layout="fill"
              objectFit="cover"
              quality={100}
              sizes="100%"
              className="object-cover"
            />
          </div>
        </Link>
        {children}
        <Sheet>
          <SheetTrigger asChild>
            <div className="icon-button cursor-pointer hover:opacity-50">
              <MenuIcon size={22} />
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex items-center justify-between pt-5">
              {data?.user ? (
                <div className="flex items-center gap-2 shadow-red-600">
                  <Avatar>
                    <AvatarImage src={data.user?.image as string | undefined} />
                    <AvatarFallback className="uppercase">
                      {data.user?.name?.[0]}
                      {data.user?.name?.[1]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">Olá, {data.user?.name}</span>
                </div>
              ) : (
                <h1 className="font-semibold">Olá. Faça seu login!</h1>
              )}
              {status === "unauthenticated" && (
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="icon-button">
                        <Button size={"icon"}>
                          <LogIn />
                        </Button>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[85%] rounded-xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Faça login na plataforma
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Conecte-se usando sua conta do Google ou Github
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="flex items-center justify-center gap-3">
                        <Button
                          variant={"outline"}
                          className="flex w-full items-center gap-1"
                        >
                          <Github size={14} />
                          Github
                        </Button>
                        <Button
                          variant={"outline"}
                          className="flex w-full items-center gap-1"
                          onClick={handleClickLogIn}
                        >
                          <Mail size={14} />
                          Google
                        </Button>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
            <div className="py-5">
              <Separator />
            </div>
            <div className="flex flex-col gap-4">
              <SheetClose asChild>
                <Link href={"/"}>
                  <Button
                    className="flex w-full items-center justify-start gap-3 rounded-3xl"
                    variant={`${isActive("/") ? "default" : "ghost"}`}
                  >
                    <HomeIcon size={16} />
                    Inicio
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/myrequest"}>
                  <Button
                    className="flex w-full items-center justify-start gap-3 rounded-3xl"
                    variant={`${isActive("/myrequest") ? "default" : "ghost"}`}
                  >
                    <ScrollText size={16} />
                    Meus pedidos
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/restaurants-favorite"}>
                  <Button
                    className="flex w-full items-center justify-start gap-3 rounded-3xl"
                    variant={`${isActive("/restaurants-favorite") ? "default" : "ghost"}`}
                  >
                    <Heart size={16} />
                    Restaurantes Favoritos
                  </Button>
                </Link>
              </SheetClose>
            </div>
            <div className="py-5">
              <Separator />
            </div>
            {status === "authenticated" && (
              <Button
                className="flex w-full items-center justify-start gap-3 rounded-3xl"
                variant={"ghost"}
                onClick={handleClickLogOut}
              >
                <LogOut size={16} />
                Sair da conta
              </Button>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Header;
