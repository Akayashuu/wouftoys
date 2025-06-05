import {
    Zap,
    Bone,
    Circle,
    CircleIcon,
    Disc3,
    Donut,
    Heart,
    Link,
    Puzzle,
    Waves,
} from "lucide-react"
import { Button } from "./button/button"
import { Card, CardContent } from "./card"
import { Badge } from "./badge"
import type { Product } from "@/lib/infrastructure/repository/ProductsRepository"

interface ProductCardProps {
    product: Product
    index: number
}

const CATEGORY_ICONS = {
    Balles: Circle,
    Cordes: Link,
    Anneaux: CircleIcon,
    Peluches: Heart,
    Frisbees: Disc3,
    Puzzles: Puzzle,
    Os: Bone,
    Formes: Donut,
    Aquatiques: Waves,
} as const

const getCategoryIcon = () => {
    const icons = Object.values(CATEGORY_ICONS)
    const randomIndex = Math.floor(Math.random() * icons.length)
    return icons[randomIndex]
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const IconComponent = getCategoryIcon()
    return (
        <Card
            className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-lg overflow-hidden transform hover:-translate-y-3 hover:rotate-1 p-0"
            onClick={() => {
                window.location.href = `/products/${product.id}`
            }}
        >
            <CardContent className="p-0">
                <div className="relative overflow-hidden">
                    <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <IconComponent className="h-24 w-24 text-gray-400" />
                    </div>

                    {/* Stock Badge */}
                    {Number(product.variants[0].stockLevel) <= 10 && (
                        <Badge className="absolute top-4 right-4 bg-red-500 text-white border-0 rounded-full px-3 py-1 font-bold animate-pulse">
                            <Zap className="h-4 w-4 mr-1" />
                            Stock limité !
                        </Badge>
                    )}
                </div>

                <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
                        {product.name}
                    </h3>
                    <div className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                        <span dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black text-orange-600">
                            {Number(product.variants[0].price)} €
                        </span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Stock disponible :</span>
                            <span
                                className={`font-bold ${Number(product.variants[0].stockLevel) <= 10 ? "text-red-600" : "text-green-600"}`}
                            >
                                {product.variants[0].stockLevel}
                            </span>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 rounded-2xl border-0 transform hover:scale-105 transition-all">
                            <Zap className="mr-2 h-4 w-4" />
                            Je le veux !
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
