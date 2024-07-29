import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./_context/cart";
import AuthProvider from "./_providers/next-auth";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Foods Amaral",
  generator: "Foods amaral",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <CartProvider>
            <div className=" hidden md:block md:border-b">
              <div className=" md:container ">
                {/* <Header /> */}
              </div>
            </div>
            {children}
          </CartProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
