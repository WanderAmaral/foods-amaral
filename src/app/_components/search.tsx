"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { cn } from "../_lib/utils";

interface SearchProps {
  className?: string;
}

const Search = ({ className }: SearchProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) return;

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form
      className={cn("flex gap-3 md:rounded-xl md:bg-white", className)}
      onSubmit={handleSearchSubmit}
    >
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleChange}
        value={search}
      />
      <Button type="submit" className="md:bg-[#EA1D2C]">
        <SearchIcon size={22} />
      </Button>
    </form>
  );
};

export default Search;
