"use client";

import Link from "next/link";
import { Package, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg truncate group-hover:text-primary transition-colors">
                {product.name}
              </CardTitle>
              <CardDescription className="mt-1 truncate">
                SKU: {product.sku}
              </CardDescription>
            </div>
            {product.isAvailable ? (
              <Badge className="bg-success/10 text-success border-success/20 flex-shrink-0">
                En Stock
              </Badge>
            ) : (
              <Badge className="bg-destructive/10 text-destructive border-destructive/20 flex-shrink-0">
                Agotado
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3 flex-1 flex flex-col">
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <p className="text-2xl font-bold text-primary">
              S/ {parseFloat(product.price).toFixed(2)}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {product.isAvailable ? (
                <>
                  <Package className="h-4 w-4" />
                  <span>{product.stock} unidades</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <span className="text-destructive">Sin stock</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
