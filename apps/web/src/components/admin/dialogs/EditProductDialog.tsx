import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/admin/forms/ProductForm";
import { Product } from "@/lib/types";
import { ProductFormData } from "@/lib/schemas";

interface EditProductDialogProps {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductFormData) => void;
  isLoading: boolean;
}

export function EditProductDialog({
  product,
  onOpenChange,
  onSubmit,
  isLoading,
}: EditProductDialogProps) {
  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogDescription>
            Modifica los datos del producto
          </DialogDescription>
        </DialogHeader>
        {product && (
          <ProductForm
            initialData={product}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
