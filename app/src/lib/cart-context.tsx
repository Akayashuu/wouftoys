"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"

interface CartItem {
    id: number
    name: string
    price: number
    image: string
    quantity: number
}

interface CartState {
    items: CartItem[]
}

type CartAction =
    | { type: "ADD_TO_CART"; payload: CartItem }
    | { type: "REMOVE_FROM_CART"; payload: number }
    | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
    | { type: "CLEAR_CART" }

const CartContext = createContext<{
    items: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: number) => void
    updateQuantity: (id: number, quantity: number) => void
    clearCart: () => void
    getCartTotal: () => number
    getCartCount: () => number
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingItem = state.items.find((item) => item.id === action.payload.id)

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item,
                    ),
                }
            }

            return {
                ...state,
                items: [...state.items, action.payload],
            }
        }

        case "REMOVE_FROM_CART":
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            }

        case "UPDATE_QUANTITY":
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter((item) => item.id !== action.payload.id),
                }
            }

            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item,
                ),
            }

        case "CLEAR_CART":
            return {
                ...state,
                items: [],
            }

        default:
            return state
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] })

    const addToCart = (item: CartItem) => {
        dispatch({ type: "ADD_TO_CART", payload: item })
    }

    const removeFromCart = (id: number) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: id })
    }

    const updateQuantity = (id: number, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
    }

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" })
    }

    const getCartTotal = () => {
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    const getCartCount = () => {
        return state.items.reduce((count, item) => count + item.quantity, 0)
    }

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
