"use client"

import { Button } from "@/components/ui/button/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart()

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center space-y-6">
                    <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto" />
                    <h1 className="text-3xl font-bold">Votre panier est vide</h1>
                    <p className="text-gray-600 text-lg">
                        Découvrez nos jouets pour chiens et ajoutez-les à votre panier
                    </p>
                    <Button asChild size="lg">
                        <Link href="/products">Découvrir nos produits</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const shippingCost = getCartTotal() >= 50 ? 0 : 4.99
    const totalWithShipping = getCartTotal() + shippingCost

    return (
        <div className="container mx-auto px-4 py-8">
            <Button variant="ghost" asChild className="mb-6">
                <Link href="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continuer mes achats
                </Link>
            </Button>

            <h1 className="text-3xl font-bold mb-8">Mon panier ({getCartCount()} articles)</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <Card key={item.id}>
                            <CardContent className="p-6">
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-lg">
                                        <ShoppingBag className="h-12 w-12 text-gray-300" />
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <h3 className="font-semibold text-lg">{item.name}</h3>
                                        <p className="text-blue-600 font-bold text-lg">
                                            {item.price.toFixed(2)} €
                                        </p>

                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            Math.max(0, item.quantity - 1),
                                                        )
                                                    }
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateQuantity(
                                                            item.id,
                                                            Number.parseInt(e.target.value) || 1,
                                                        )
                                                    }
                                                    className="w-16 text-center"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" />
                                                Supprimer
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-bold text-lg">
                                            {(item.price * item.quantity).toFixed(2)} €
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-4">
                        <CardHeader>
                            <CardTitle>Récapitulatif de commande</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Sous-total</span>
                                    <span>{getCartTotal().toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Livraison</span>
                                    <span>
                                        {shippingCost === 0 ? (
                                            <span className="text-green-600 font-medium">
                                                Gratuite
                                            </span>
                                        ) : (
                                            `${shippingCost.toFixed(2)} €`
                                        )}
                                    </span>
                                </div>
                                {getCartTotal() < 50 && (
                                    <p className="text-sm text-gray-600">
                                        Livraison gratuite dès 50€ d&apos;achat
                                    </p>
                                )}
                            </div>

                            <Separator />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>{totalWithShipping.toFixed(2)} €</span>
                            </div>

                            <Button asChild className="w-full" size="lg">
                                <Link href="/checkout">Passer commande</Link>
                            </Button>

                            <Button variant="outline" asChild className="w-full">
                                <Link href="/products">Continuer mes achats</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
