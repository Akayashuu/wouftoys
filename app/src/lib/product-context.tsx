"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import ProductRepository, { type Product } from "./infrastructure/repository/ProductsRepository"

interface ProductContextType {
    products: Product[]
    loading: boolean
    error: string | null
    getProduct: (id: string) => Product | undefined
    getProductAsync: (id: string) => Promise<Product | null>
    queryProductsWithLimit: (limit: number) => Promise<Product[]>
    refreshProducts: () => Promise<void>
}

const ProductContext = createContext<ProductContextType | null>(null)

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const productRepo = ProductRepository.default()

    const loadProducts = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await productRepo.getProducts()
            setProducts(response.data.products.items)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur lors du chargement des produits")
            console.error("Erreur lors du chargement des produits:", err)
        } finally {
            setLoading(false)
        }
    }

    const getProduct = (id: string): Product | undefined => {
        return products.find((product) => product.id === id)
    }

    const queryProductsWithLimit = async (limit: number): Promise<Product[]> => {
        try {
            const response = await productRepo.queryProductsWithLimit(limit)
            return response.data.products.items
        } catch (err) {
            console.error("Erreur lors de la récupération des produits avec limite:", err)
            return []
        }
    }

    const getProductAsync = async (id: string): Promise<Product | null> => {
        try {
            const cachedProduct = getProduct(id)
            if (cachedProduct) {
                return cachedProduct
            }

            const response = await productRepo.getProduct(id)
            return response.data.product || null
        } catch (err) {
            console.error("Erreur lors du chargement du produit:", err)
            return null
        }
    }

    const refreshProducts = async () => {
        await loadProducts()
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                error,
                getProduct,
                getProductAsync,
                queryProductsWithLimit,
                refreshProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error("useProducts must be used within a ProductProvider")
    }
    return context
}
