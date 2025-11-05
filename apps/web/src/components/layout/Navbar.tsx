"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartDrawer from "@/components/cart/CartDrawer";

import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/stores" className="flex items-center gap-2 font-bold text-xl text-primary hover:text-primary/80 transition-colors">
          <Store className="h-6 w-6" />
          <span>Mini Market</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/stores"
            className={cn(
              "font-medium",
              pathname === "/stores" ? "text-primary" : "text-muted-foreground",
              "hover:text-primary transition-colors"
            )}
          >
            Tiendas
          </Link>

          <CartDrawer />

          <Button asChild className="gap-2">
            <Link href="/login">
              <LogIn className="h-4 w-4" />
              Iniciar Sesión
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
