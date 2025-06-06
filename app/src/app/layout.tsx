import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"
import { ProductProvider } from "@/lib/product-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "DogToys - Jouets pour chiens de qualité",
    description:
        "Découvrez notre collection de jouets premium pour chiens. Qualité garantie, livraison rapide, bonheur assuré !",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <body className={inter.className}>
                <ProductProvider>
                    <CartProvider>
                        <div className="min-h-screen flex flex-col">
                            <Header />
                            <main className="flex-1">{children}</main>
                            <Toaster />
                            <Footer />
                        </div>
                    </CartProvider>
                </ProductProvider>
            </body>
        </html>
    )
}
