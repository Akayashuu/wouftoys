import shopApi from "@/lib/ApolloClient"
import { gql } from "@apollo/client"

export type ProductWithQuantity = {
    variantId: string
    quantity: number
}

export type Address = {
    fullName: string
    streetLine1: string
    city: string
    postalCode: string
    countryCode: string
}

export type CustomerInput = {
    firstName: string
    lastName: string
    emailAddress: string
}

class OrderRepository {
    public static default() {
        return new OrderRepository()
    }

    // Clear Apollo Client cache to ensure fresh session data
    private async clearCache() {
        try {
            await shopApi.clearStore()
            console.log("Apollo cache cleared")
        } catch (error) {
            console.warn("Failed to clear cache:", error)
        }
    }

    // Force refresh active order from server
    private async refreshActiveOrder() {
        try {
            const getActiveOrder = gql`
                query RefreshActiveOrder {
                    activeOrder {
                        id
                        code
                        state
                        active
                        lines {
                            id
                            quantity
                            productVariant {
                                id
                                name
                            }
                        }
                    }
                }
            `

            const result = await shopApi.query({
                query: getActiveOrder,
                errorPolicy: "all",
            })

            console.log("Refreshed active order:", result.data?.activeOrder)
            return result.data?.activeOrder
        } catch (error) {
            console.error("Failed to refresh active order:", error)
            return null
        }
    }

    // Test adding a single item with enhanced session management
    public async testAddSingleItem(variantId: string, quantity = 1) {
        try {
            console.log(`Testing add item: ${variantId} qty: ${quantity}`)

            const addItemMutation = gql`
                    mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
                        addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
                        __typename
                        ... on Order {
                            id
                            code
                            state
                            active
                            totalWithTax
                            lines {
                                id
                                quantity
                                linePrice
                                productVariant {
                                    id
                                    name
                                    stockLevel
                                }
                            }
                        }
                        
                    }
                }
            `

            const result = await shopApi.mutate({
                mutation: addItemMutation,
                variables: {
                    productVariantId: variantId,
                    quantity,
                },
                errorPolicy: "all",
                // Force a fresh request
                fetchPolicy: "no-cache",
            })

            console.log("Add item result:", JSON.stringify(result.data, null, 2))

            if (result.errors) {
                console.error("GraphQL errors:", result.errors)
            }

            return result.data?.addItemToOrder
        } catch (error) {
            console.error("Add item test failed:", error)
            throw error
        }
    }

    // Enhanced order creation with better session management
    public async createOrderFromProductsDebug({
        products,
        customer,
        shippingAddress,
        billingAddress,
    }: {
        products: ProductWithQuantity[]
        customer: CustomerInput
        shippingAddress: Address
        billingAddress: Address
    }) {
        try {
            console.log("=== STARTING ENHANCED ORDER CREATION ===")

            // Step 0: Clear any stale cache data
            await this.clearCache()

            // Step 1: Add all products to create the order
            console.log("Step 1: Adding all products...")
            let orderId: string | null = null

            for (const product of products) {
                console.log(`Adding product: ${product.variantId} qty: ${product.quantity}`)
                const addResult = await this.testAddSingleItem(product.variantId, product.quantity)

                if (addResult && "errorCode" in addResult) {
                    throw new Error(`Failed to add item: ${addResult.message}`)
                }

                if (addResult && "id" in addResult && !orderId) {
                    orderId = addResult.id
                }
            }

            if (!orderId) {
                throw new Error("No order ID captured after adding products")
            }

            await this.setOrderShippingAddress({
                fullName: shippingAddress.fullName,
                streetLine1: shippingAddress.streetLine1,
                city: shippingAddress.city,
                postalCode: shippingAddress.postalCode,
                countryCode: shippingAddress.countryCode,
                phoneNumber: "0000000000", // Optional, can be empty
            })

            return { id: orderId }
        } catch (error) {
            console.error("=== ORDER CREATION FAILED ===")
            console.error("Error details:", {
                message: error.message,
                networkError: error.networkError,
                graphQLErrors: error.graphQLErrors,
            })
            throw error
        }
    }

    async setOrderShippingAddress(input: {
        fullName: string
        streetLine1: string
        city: string
        postalCode: string
        countryCode: string
        phoneNumber?: string
    }): Promise<
        | {
              id: string
              shippingAddress: Address
          }
        | {
              errorCode: string
              message: string
          }
    > {
        const document = gql`
          mutation SetOrderShippingAddress($input: CreateAddressInput!) {
            setOrderShippingAddress(input: $input) {
              ... on Order {
                id
                shippingAddress {
                  fullName
                  streetLine1
                  city
                  postalCode
                  country
                  phoneNumber
                }
              }
              ... on ErrorResult {
                errorCode
                message
              }
            }
          }
        `

        const response = await shopApi.mutate({
            mutation: document,
            variables: {
                input: {
                    fullName: input.fullName,
                    streetLine1: input.streetLine1,
                    city: input.city,
                    postalCode: input.postalCode,
                    countryCode: input.countryCode,
                    phoneNumber: input.phoneNumber || "",
                },
            },
        })

        console.log("Set order shipping address response:", response.data)

        if (response.data?.setOrderShippingAddress?.errorCode) {
            throw new Error(response.data.setOrderShippingAddress.message)
        }

        return response.data?.setOrderShippingAddress
    }

    public async createOrderFromProducts({
        products,
        customer,
        shippingAddress,
        billingAddress,
    }: {
        products: ProductWithQuantity[]
        customer: CustomerInput
        shippingAddress: Address
        billingAddress: Address
    }) {
        return this.createOrderFromProductsDebug({
            products,
            customer,
            shippingAddress,
            billingAddress,
        })
    }
}

export default OrderRepository
