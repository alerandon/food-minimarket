import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Store } from "@/lib/types";

interface StoreCardProps {
  store: Store;
  onEdit: (store: Store) => void;
  onDelete: (storeId: string) => void;
}

export function StoreCard({ store, onEdit, onDelete }: StoreCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{store.name}</CardTitle>
        <CardDescription>{store.city}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">{store.address}</p>
          <p className="text-muted-foreground">{store.phone}</p>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onEdit(store)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button asChild variant="secondary" className="flex-1">
            <Link href={`/admin/stores/${store.id}/products`}>
              Ver Productos
            </Link>
          </Button>
        </div>
        <Button
          variant="destructive"
          size="sm"
          className="w-full mt-2"
          onClick={() => onDelete(store.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </CardContent>
    </Card>
  );
}
