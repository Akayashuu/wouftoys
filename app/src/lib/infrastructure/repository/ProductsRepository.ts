import shopApi from "@/lib/ApolloClient"
import { gql } from "@apollo/client"

export type Product = {
    id: string
    name: string
    description: string
    variants: {
        id: string
        price: number
        stockLevel: number
    }[]
}

class ProductRepository {
    static default() {
        return new ProductRepository()
    }

    public getProductsQuery() {
        return gql`
                query GetProducts {
                    products {
                    items {
                    id
                    name
                    description
                    variants {
                        id
                        price
                        stockLevel
                    }
                }
            }
        }`
    }

    public getProductQuery(productId: string) {
        return gql`
                query GetProduct {    
                    product(id: "${productId}") {
                        id
                        name
                        description
                        variants {
                            id
                            price
                            stockLevel
                        }
                    }
                }`
    }

    public getProductsWithLimitQuery(limit: number) {
        return gql`
                query GetProductsWithLimit {
                    products(options: { take: ${limit} }) {
                        items {
                            id
                            name
                            description
                            variants {
                                id
                                price
                                stockLevel
                            }
                        }
                    }
                }`
    }

    public async queryProductsWithLimit(limit: number) {
        return await shopApi.query<{
            products: {
                items: Product[]
            }
        }>({
            query: this.getProductsWithLimitQuery(limit),
        })
    }

    /**
     * Assuming we have only one variant per product,
     * this method retrieves all products with their details.
     */
    public async getProducts() {
        return await shopApi.query<{
            products: {
                items: Product[]
            }
        }>({
            query: this.getProductsQuery(),
        })
    }

    public async getProduct(productId: string) {
        return await shopApi.query<{
            product: Product
        }>({
            query: this.getProductQuery(productId),
        })
    }
}

export default ProductRepository
