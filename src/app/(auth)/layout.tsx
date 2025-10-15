import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <AuthProvider>
        <main>{children}</main>
      </AuthProvider>
    </CartProvider>
  );
}
