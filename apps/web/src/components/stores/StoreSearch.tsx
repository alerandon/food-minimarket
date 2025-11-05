"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function StoreSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.elements.namedItem("search") as HTMLInputElement;
        handleSearch(input.value);
      }}
      className="flex gap-2 w-full max-w-2xl"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          name="search"
          placeholder="Buscar tiendas por nombre, ciudad o dirección..."
          defaultValue={searchParams.get("query")?.toString()}
          className="pl-10"
        />
      </div>
      <Button type="submit" className="gap-2">
        <Search className="h-4 w-4" />
        Buscar
      </Button>
    </form>
  );
}
