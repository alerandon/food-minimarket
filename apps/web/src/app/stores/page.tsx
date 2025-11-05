import { Suspense } from "react";
import StoreSearch from "@/components/stores/StoreSearch";
import StoreGrid from "@/components/stores/StoreGrid";
import { searchStores } from "@/lib/mockData";

export default async function StoresPage({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const params = await searchParams;
  const stores = searchStores(params?.query || "");

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Explora Nuestras Tiendas</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Encuentra las mejores tiendas cerca de ti y descubre sus productos
        </p>
      </div>

      <div className="flex justify-center">
        <Suspense fallback={<div>Cargando...</div>}>
          <StoreSearch />
        </Suspense>
      </div>

      <StoreGrid stores={stores} />
    </div>
  );
}
