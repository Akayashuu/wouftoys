"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, ShoppingCart, Heart, Truck, Shield } from "lucide-react"
import { notFound } from "next/navigation"
import { toast } from "sonner"
import React from "react"

const products = [
    {
        id: 1,
        name: "Balle rebondissante",
        description: "Balle en caoutchouc très résistante. Diamètre : 6 cm.",
        price: 5.99,
        stock: 20,
        image: null,
        rating: 4.8,
        reviews: 124,
        features: ["Caoutchouc résistant", "Diamètre 6 cm", "Rebond optimal", "Facile à nettoyer"],
    },
    {
        id: 2,
        name: "Corde à mâcher",
        description: "Jouet en corde multicolore, longueur 25 cm.",
        price: 7.49,
        stock: 15,
        image: "/placeholder.svg?height=500&width=500",
        rating: 4.6,
        reviews: 89,
        features: [
            "Corde multicolore",
            "Longueur 25 cm",
            "Aide au nettoyage des dents",
            "Matériaux naturels",
        ],
    },
    {
        id: 3,
        name: "Anneau solide",
        description: "Anneau en plastique dur, parfait pour tirer et lancer.",
        price: 6.99,
        stock: 10,
        image: "/placeholder.svg?height=500&width=500",
        rating: 4.5,
        reviews: 67,
        features: [
            "Plastique dur",
            "Parfait pour tirer",
            "Facile à lancer",
            "Résistant aux morsures",
        ],
    },
    {
        id: 4,
        name: "Peluche renard",
        description: "Jouet en peluche avec couineur. Taille : 20 cm.",
        price: 9.99,
        stock: 12,
        image: "/placeholder.svg?height=500&width=500",
        rating: 4.9,
        reviews: 156,
        features: ["Peluche douce", "Couineur intégré", "Taille 20 cm", "Lavable en machine"],
    },
    {
        id: 5,
        name: "Frisbee en silicone",
        description: "Souple et léger, diamètre 22 cm.",
        price: 8.49,
        stock: 10,
        image: "/placeholder.svg?height=500&width=500",
        rating: 4.7,
        reviews: 98,
        features: ["Silicone souple", "Diamètre 22 cm", "Ultra léger", "Flotte sur l'eau"],
    },
    {
        id: 6,
        name: "Jouet distributeur de friandises",
        description: "À remplir avec des croquettes.",
        price: 12.99,
        stock: 8,
        image: "/placeholder.svg?height=500&width=500",
        rating: 4.8,
        reviews: 134,
        features: [
            "Distributeur de friandises",
            "Stimule l'intelligence",
            "Facile à remplir",
            "Matériaux sûrs",
        ],
    },
    {
        id: 7,
        name: "Os en nylon",
        description: "Pour chiens qui aiment mâcher.",
        price: 4.99,
        stock: 25,
        image: "/placeholder.svg?height=500&width=500",
        rating: 4.4,
        reviews: 78,
        features: ["Nylon résistant", "Aide au nettoyage des dents", "Longue durée", "Sans danger"],
    },
    {
        id: 8,
        name: "Balles lumineuses (lot de 2)",
        description: "Clignotent lorsqu'on les lance.",
        price: 10.99,
        stock: 14,
        image: "/placeholder.svg?height=500&width=500",
        rating: 4.6,
        reviews: 92,
        features: ["Lot de 2 balles", "LED intégrées", "Activation au mouvement", "Étanches"],
    },
    {
        id: 9,
        name: "Jouet en forme de donut",
        description: "Caoutchouc souple. Couleurs variées.",
        price: 6.49,
        stock: 18,
        image: "/placeholder.svg?height=500&width=500",
        rating: 4.5,
        reviews: 65,
        features: ["Forme donut", "Caoutchouc souple", "Couleurs variées", "Facile à saisir"],
    },
    {
        id: 10,
        name: "Jouet flottant",
        description: "Idéal pour le jeu dans l'eau.",
        price: 11.49,
        stock: 9,
        image: "/placeholder.svg?height=500&width=500",
        rating: 4.7,
        reviews: 87,
        features: ["Flotte sur l'eau", "Matériaux étanches", "Couleurs vives", "Facile à repérer"],
    },
]

interface ProductPageProps {
    params: {
        id: string
    }
}

export default function ProductPage({ params }: ProductPageProps) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { id } = React.use(params)
    const [quantity, setQuantity] = useState(1)
    const { addToCart } = useCart()

    const product = products.find((p) => p.id === Number.parseInt(id))

    if (!product) {
        notFound()
    }

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || "/placeholder.svg?height=500&width=500",
            quantity: quantity,
        })

        toast("Produit ajouté au panier", {
            description: (
                <span className="text-gray-900 flex items-center gap-2">
                    <ShoppingCart className="inline-block text-blue-600 animate-bounce" />
                    <span className="font-semibold text-blue-700">
                        {quantity} x {product.name}
                    </span>
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium animate-pulse">
                        Ajouté !
                    </span>
                </span>
            ),
            className: "border-l-4 border-blue-600 shadow-lg bg-white",
            duration: 3000,
        })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button variant="ghost" asChild className="mb-6">
                <Link href="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour aux produits
                </Link>
            </Button>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Image */}
                <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-lg flex items-center justify-center bg-gray-100 h-96 lg:h-[500px]">
                        {product.image ? (
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={500}
                                height={500}
                                className="w-full h-96 lg:h-[500px] object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                                <ShoppingCart className="w-24 h-24 mb-4" />
                                <span>Aucune image</span>
                            </div>
                        )}
                        {product.stock <= 10 && (
                            <Badge className="absolute top-4 left-4 bg-red-500">Stock limité</Badge>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>
                        <p className="text-gray-600 text-lg">{product.description}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i.toString()}
                                    className={`h-5 w-5 ${
                                        i < Math.floor(product.rating)
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-lg font-medium">{product.rating}</span>
                        <span className="text-gray-600">({product.reviews} avis)</span>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <span className="text-3xl font-bold text-blue-600">
                            {product.price.toFixed(2)} €
                        </span>
                        <p className="text-gray-600">Stock disponible : {product.stock} unités</p>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="quantity">Quantité</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        max={product.stock}
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(
                                                Math.max(
                                                    1,
                                                    Math.min(
                                                        product.stock,
                                                        Number.parseInt(e.target.value) || 1,
                                                    ),
                                                ),
                                            )
                                        }
                                        className="w-24"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        onClick={handleAddToCart}
                                        className="flex-1"
                                        disabled={product.stock === 0}
                                    >
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Ajouter au panier
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Heart className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Features */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Caractéristiques</h3>
                        <ul className="space-y-2">
                            {product.features.map((feature, index) => (
                                <li key={index.toString()} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shipping Info */}
                    <div className="space-y-4">
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <Truck className="h-5 w-5 text-blue-600" />
                                <div>
                                    <p className="font-medium">Livraison rapide</p>
                                    <p className="text-sm text-gray-600">2-3 jours ouvrés</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Shield className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="font-medium">Garantie qualité</p>
                                    <p className="text-sm text-gray-600">30 jours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
