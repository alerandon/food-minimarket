import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onEdit: (productId: string) => void;
  onDelete: (productId: string) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="line-clamp-1">{product.name}</CardTitle>
            <CardDescription className="line-clamp-2 mt-2">
              {product.description || "Sin descripción"}
            </CardDescription>
          </div>
          <Badge variant={product.isAvailable ? "default" : "secondary"}>
            {product.isAvailable ? "Disponible" : "No disponible"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Precio:</span>
            <span className="font-semibold">${product.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Stock:</span>
            <span className="font-semibold">{product.stock}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">SKU:</span>
            <span className="font-mono text-xs">{product.sku}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            size="sm"
            onClick={() => onEdit(product.id)}
          >
            <Edit className="mr-2 h-3 w-3" />
            Editar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="mr-2 h-3 w-3" />
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
