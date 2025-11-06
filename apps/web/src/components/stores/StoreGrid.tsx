import { Store } from "@/lib/types";
import StoreCard from "./StoreCard";

interface StoreGridProps {
  stores: Store[];
}

const StoreGrid = ({ stores }: StoreGridProps) => {
  if (stores.length === 0) {
    return (
      <div className="text-center py-12 md:py-16 px-4">
        <p className="text-muted-foreground text-base md:text-lg">No se encontraron tiendas</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
};

export default StoreGrid;
