"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="flex items-center gap-6">
        <Link
          className={cn("hover:underline", { underline: pathname === "/" })}
          href="/"
        >
          Home
        </Link>

        <Link
          className={cn("hover:underline", {
            underline: pathname?.startsWith("/products"),
          })}
          href="/products"
        >
          Products
        </Link>

        <Link
          className={cn("hover:underline", {
            underline: pathname?.startsWith("/about"),
          })}
          href="/about"
        >
          About
        </Link>

        <Link
          className={cn("hover:underline", {
            underline: pathname?.startsWith("/contact"),
          })}
          href="/contact"
        >
          Contact
        </Link>
      </div>

      {/* Add any right-side navbar content here */}
    </nav>
  );
}
