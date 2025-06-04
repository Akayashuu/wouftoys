"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Star, Zap, Filter, Grid, Award } from "lucide-react"
import type { Product } from "@/lib/types"
import { ProductCard } from "@/components/ui/alternate-product-card"

const products: Product[] = [
    {
        id: 1,
        name: "Balle rebondissante",
        description: "Balle en caoutchouc très résistante. Diamètre : 6 cm.",
        price: 5.99,
        stock: 20,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 124,
        category: "Balles",
        icon: "CircleIcon",
    },
    {
        id: 2,
        name: "Corde à mâcher",
        description: "Jouet en corde multicolore, longueur 25 cm.",
        price: 7.49,
        stock: 15,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 89,
        category: "Cordes",
        icon: "Link",
    },
    {
        id: 3,
        name: "Anneau solide",
        description: "Anneau en plastique dur, parfait pour tirer et lancer.",
        price: 6.99,
        stock: 10,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 67,
        category: "Anneaux",
        icon: "Circle",
    },
    {
        id: 4,
        name: "Peluche renard",
        description: "Jouet en peluche avec couineur. Taille : 20 cm.",
        price: 9.99,
        stock: 12,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 156,
        category: "Peluches",
        icon: "Heart",
    },
    {
        id: 5,
        name: "Frisbee en silicone",
        description: "Souple et léger, diamètre 22 cm.",
        price: 8.49,
        stock: 10,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 98,
        category: "Frisbees",
        icon: "Disc3",
    },
    {
        id: 6,
        name: "Jouet distributeur de friandises",
        description: "À remplir avec des croquettes.",
        price: 12.99,
        stock: 8,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 134,
        category: "Puzzles",
        icon: "Puzzle",
    },
    {
        id: 7,
        name: "Os en nylon",
        description: "Pour chiens qui aiment mâcher.",
        price: 4.99,
        stock: 25,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.4,
        reviews: 78,
        category: "Os",
        icon: "Bone",
    },
    {
        id: 8,
        name: "Balles lumineuses (lot de 2)",
        description: "Clignotent lorsqu'on les lance.",
        price: 10.99,
        stock: 14,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 92,
        category: "Balles",
        icon: "Lightbulb",
    },
    {
        id: 9,
        name: "Jouet en forme de donut",
        description: "Caoutchouc souple. Couleurs variées.",
        price: 6.49,
        stock: 18,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 65,
        category: "Formes",
        icon: "Donut",
    },
    {
        id: 10,
        name: "Jouet flottant",
        description: "Idéal pour le jeu dans l'eau.",
        price: 11.49,
        stock: 9,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 87,
        category: "Aquatiques",
        icon: "Waves",
    },
]

// Components
interface PageHeaderProps {
    productsCount: number
}

const PageHeader = ({ productsCount }: PageHeaderProps) => (
    <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-6 py-3 mb-6">
            <Grid className="h-6 w-6 text-orange-600" />
            <span className="text-orange-600 font-bold">Tous nos jouets</span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 bg-clip-text text-transparent">
            La plus grande
            <br />
            aire de jeux !
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            <Zap className="inline h-5 w-5 mr-1" />
            Découvrez {productsCount} jouets extraordinaires qui vont faire craquer votre toutou !
        </p>
    </div>
)

interface ProductFiltersProps {
    productsCount: number
    sortBy: string
    onSortChange: (value: string) => void
}

const ProductFilters = ({ productsCount, sortBy, onSortChange }: ProductFiltersProps) => (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-12 bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="font-bold text-gray-800">{productsCount} jouets disponibles</span>
            </div>
        </div>

        <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-700">Trier par :</span>
            <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="w-48 rounded-xl border-2 border-orange-200 focus:border-orange-400">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="name-asc">
                        <div className="flex items-center gap-2">
                            <Grid className="h-4 w-4" />
                            Nom (A-Z)
                        </div>
                    </SelectItem>
                    <SelectItem value="name-desc">
                        <div className="flex items-center gap-2">
                            <Grid className="h-4 w-4" />
                            Nom (Z-A)
                        </div>
                    </SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="rating">
                        <div className="flex items-center gap-2">
                            <Star className="h-4 w-4" />
                            Mieux notés
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
)

interface ProductGridProps {
    products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
        ))}
    </div>
)

const BottomCTA = () => (
    <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-black mb-4 flex items-center justify-center gap-2">
                <Award className="h-6 w-6" />
                Vous ne trouvez pas votre bonheur ?
            </h3>
            <p className="text-lg mb-6 text-orange-100">
                Contactez-nous ! Nous avons peut-être le jouet parfait en préparation !
            </p>
            <Button className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-8 py-3 rounded-2xl">
                <Award className="mr-2 h-5 w-5" />
                Nous contacter
            </Button>
        </div>
    </div>
)

// Main Component
export default function ProductsPage() {
    const [sortBy, setSortBy] = useState<string>("name-asc")

    const sortedProducts = useMemo(() => {
        const sorted = [...products]

        switch (sortBy) {
            case "price-asc":
                return sorted.sort((a, b) => a.price - b.price)
            case "price-desc":
                return sorted.sort((a, b) => b.price - a.price)
            case "name-asc":
                return sorted.sort((a, b) => a.name.localeCompare(b.name))
            case "name-desc":
                return sorted.sort((a, b) => b.name.localeCompare(a.name))
            case "rating":
                return sorted.sort((a, b) => b.rating - a.rating)
            default:
                return sorted
        }
    }, [sortBy])

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
            <div className="container mx-auto px-4 py-12">
                <PageHeader productsCount={products.length} />
                <ProductFilters
                    productsCount={products.length}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                />
                <ProductGrid products={sortedProducts} />
                <BottomCTA />
            </div>
        </div>
    )
}
