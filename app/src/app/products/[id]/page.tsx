"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Heart, Truck, Shield } from "lucide-react"
import { notFound } from "next/navigation"
import { toast } from "sonner"
import React from "react"
import { useProducts } from "@/lib/product-context"
import type { Product } from "@/lib/infrastructure/repository/ProductsRepository"

interface ProductPageProps {
    params: {
        id: string
    }
}

export default function ProductPage({ params }: ProductPageProps) {
    const [quantity, setQuantity] = useState(1)
    const [productId, setProductId] = useState<string | null>(null)
    const [product, setProduct] = useState<Product>({
        id: "",
        name: "",
        description: "",
        variants: [
            {
                id: "",
                price: 0,
                stockLevel: 0,
            },
        ],
    })
    const { addToCart } = useCart()
    const { getProductAsync } = useProducts()

    useEffect(() => {
        const loadParams = async () => {
            const resolvedParams = await params
            setProductId(resolvedParams.id)
        }
        loadParams()
    }, [params])

    useEffect(() => {
        const loadProduct = async () => {
            if (!productId) return

            try {
                const productData = await getProductAsync(productId)
                if (!productData) {
                    notFound()
                }
                setProduct(productData)
            } catch (error) {
                console.error("Erreur lors du chargement du produit:", error)
                notFound()
            } finally {
            }
        }

        loadProduct()
    }, [productId, getProductAsync])

    const handleAddToCart = () => {
        addToCart({
            id: Number(product.variants[0].id),
            name: product.name,
            price: product.variants[0].price,
            quantity: quantity,
            variantId: product.variants[0].id,
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
                        <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                            <ShoppingCart className="w-24 h-24 mb-4" />
                            <span>Aucune image</span>
                        </div>
                        {product.variants[0].stockLevel <= 10 && (
                            <Badge className="absolute top-4 left-4 bg-red-500">Stock limité</Badge>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>
                        <p
                            className="text-gray-600 text-lg"
                            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <span className="text-3xl font-bold text-blue-600">
                            {product.variants[0].price.toFixed(2)} €
                        </span>
                        <p className="text-gray-600">
                            Stock disponible : {product.variants[0].stockLevel} unités
                        </p>
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
                                        max={product.variants[0].stockLevel}
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(
                                                Math.max(
                                                    1,
                                                    Math.min(
                                                        product.variants[0].stockLevel,
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
                                        disabled={product.variants[0].stockLevel <= 0}
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
