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
import { Zap, Filter, Grid, Award } from "lucide-react"
import type { Product } from "@/lib/infrastructure/repository/ProductsRepository"
import { ProductCard } from "@/components/ui/product-card"
import ProductRepository from "@/lib/infrastructure/repository/ProductsRepository"

const data = await ProductRepository.default().getProducts()
const products = data ? data.data.products.items : []
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
                return sorted.sort(
                    (a, b) => (a.variants[0]?.price ?? 0) - (b.variants[0]?.price ?? 0),
                )
            case "price-desc":
                return sorted.sort(
                    (a, b) => (b.variants[0]?.price ?? 0) - (a.variants[0]?.price ?? 0),
                )
            case "name-asc":
                return sorted.sort((a, b) => a.name.localeCompare(b.name))
            case "name-desc":
                return sorted.sort((a, b) => b.name.localeCompare(a.name))
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
