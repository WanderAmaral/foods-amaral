"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

const Search = () => {
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
    <form className="flex gap-3 md:bg-white md:p-5 md:rounded-xl" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleChange}
        value={search}
        />
      <Button type="submit" className="md:bg-[#FFB100]">
        <SearchIcon size={22} />
      </Button>
    </form>
  );
};

export default Search;
