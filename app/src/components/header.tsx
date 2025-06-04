"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import { ShoppingCart, Menu, Heart, Search } from "lucide-react"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const { getCartCount } = useCart()

    const navigation = [
        { name: "🏠 Accueil", href: "/" },
        { name: "🎾 Jouets", href: "/products" },
        { name: "🐕 Notre histoire", href: "#" },
        { name: "📞 Contact", href: "#" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b-4 border-gradient-to-r from-orange-400 to-yellow-400 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                                <span className="text-white font-bold text-2xl">🐾</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
                        </div>
                        <div>
                            <span className="font-black text-2xl bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                                WoufToys
                            </span>
                            <div className="text-xs text-gray-500 font-medium">
                                Le paradis des toutous
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-4 py-2 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold transition-all duration-300 transform hover:scale-105"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden sm:flex rounded-xl hover:bg-orange-50 hover:text-orange-600"
                        >
                            <Search className="h-5 w-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden sm:flex rounded-xl hover:bg-green-50 hover:text-green-600"
                        >
                            <Heart className="h-5 w-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="relative rounded-xl hover:bg-yellow-50 hover:text-yellow-600"
                        >
                            <Link href="/cart">
                                <ShoppingCart className="h-6 w-6" />
                                {getCartCount() > 0 && (
                                    <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs flex items-center justify-center border-2 border-white animate-bounce">
                                        {getCartCount()}
                                    </Badge>
                                )}
                            </Link>
                        </Button>

                        {/* Mobile Menu */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden rounded-xl"
                                >
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-80 bg-gradient-to-br from-orange-50 to-yellow-50"
                            >
                                <div className="flex flex-col space-y-6 mt-8">
                                    <div className="text-center pb-4 border-b border-orange-200">
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                            <span className="text-white font-bold text-2xl">
                                                🐾
                                            </span>
                                        </div>
                                        <h3 className="font-black text-xl text-gray-800">
                                            Menu WoufToys
                                        </h3>
                                    </div>

                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-lg font-bold text-gray-700 hover:text-orange-600 transition-colors p-3 rounded-xl hover:bg-white/50"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}

                                    <div className="pt-6 border-t border-orange-200 space-y-3">
                                        <Button
                                            variant="outline"
                                            className="w-full rounded-xl border-2 border-orange-300 hover:bg-orange-50"
                                        >
                                            <Search className="mr-2 h-4 w-4" />
                                            Rechercher
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full rounded-xl border-2 border-green-300 hover:bg-green-50"
                                        >
                                            <Heart className="mr-2 h-4 w-4" />
                                            Mes favoris
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
