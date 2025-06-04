// components/ui/ProductCard.tsx
import { Button } from "@/components/ui/button/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Zap } from "lucide-react"

interface Product {
    id: number
    name: string
    price: number
    image: string
    rating: number
    reviews: number
    badge: string
}

interface ProductCardProps {
    product: Product
    index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
    const badgeColors = ["bg-orange-500", "bg-green-500", "bg-yellow-500"]

    return (
        <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-3xl overflow-hidden transform hover:-translate-y-2">
            <CardContent className="p-0">
                <div className="relative overflow-hidden">
                    <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge
                        className={`absolute top-4 left-4 ${badgeColors[index % 3]} text-white border-0 rounded-full px-4 py-2 font-bold`}
                    >
                        {product.badge}
                    </Badge>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-sm font-bold text-gray-800">⭐ {product.rating}</span>
                    </div>
                </div>
                <div className="p-8">
                    <h3 className="font-bold text-xl mb-3 text-gray-800">{product.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-black text-orange-600">
                            {product.price.toFixed(2)} €
                        </span>
                        <span className="text-sm text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                            {product.reviews} avis
                        </span>
                    </div>
                    <Button
                        asChild
                        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 rounded-2xl border-0"
                    >
                        <Link href={`/products/${product.id}`}>
                            <Zap className="mr-2 h-5 w-5" />
                            Je le veux !
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
