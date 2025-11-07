import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductFormData } from "@/lib/schemas";

interface CreateProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductFormData) => void;
  isLoading: boolean;
  storeName: string;
}

export function CreateProductDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  storeName,
}: CreateProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuevo Producto</DialogTitle>
          <DialogDescription>
            Completa los datos para crear un nuevo producto en {storeName}
          </DialogDescription>
        </DialogHeader>
        <ProductForm onSubmit={onSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
