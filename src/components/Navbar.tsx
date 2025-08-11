"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-wide">
          True Religion
        </Link>
        <div className="flex items-center gap-6">
          <Link className={cn("hover:underline", pathname === "/" && "underline")} href="/">
            Home
          </Link>
          <Link className={cn("hover:underline", pathname?.startsWith("/products") && "underline")} href="/products">
            Products
          </Link>
          <Link className={cn("hover:underline", pathname?.startsWith("/checkout") && "underline")} href="/checkout">
            Checkout
          </Link>
          <Link className={cn("hover:underline", pathname?.startsWith("/login") && "underline")} href="/login">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}


