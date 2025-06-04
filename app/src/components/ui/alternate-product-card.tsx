import {
    Zap,
    Star,
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
import type { Product } from "@/lib/types"
import { Badge } from "./badge"

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

// Utility Functions
const getRandomColor = (index: number): string => {
    const colors = [
        "from-orange-400 to-yellow-400",
        "from-green-400 to-yellow-400",
        "from-yellow-400 to-orange-400",
        "from-orange-400 to-green-400",
    ]
    return colors[index % colors.length]
}

const getCategoryIcon = (category: string) => {
    return CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || Circle
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
    const IconComponent = getCategoryIcon(product.category)
    return (
        <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-3xl overflow-hidden transform hover:-translate-y-3 hover:rotate-1 p-0">
            <CardContent className="p-0">
                <div className="relative overflow-hidden">
                    <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <IconComponent className="h-24 w-24 text-gray-400" />
                    </div>

                    {/* Category Badge */}
                    <Badge
                        className={`absolute top-4 left-4 bg-gradient-to-r ${getRandomColor(index)} text-white border-0 rounded-full px-3 py-1 font-bold text-sm`}
                    >
                        <IconComponent className="h-4 w-4 mr-1" />
                        {product.category}
                    </Badge>

                    {/* Stock Badge */}
                    {product.stock <= 10 && (
                        <Badge className="absolute top-4 right-4 bg-red-500 text-white border-0 rounded-full px-3 py-1 font-bold animate-pulse">
                            <Zap className="h-4 w-4 mr-1" />
                            Stock limité !
                        </Badge>
                    )}

                    {/* Rating */}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-bold text-gray-800">
                                {product.rating}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
                        {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black text-orange-600">
                            {product.price.toFixed(2)} €
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                            {product.reviews} avis
                        </span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Stock disponible :</span>
                            <span
                                className={`font-bold ${product.stock <= 10 ? "text-red-600" : "text-green-600"}`}
                            >
                                {product.stock} unités
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
