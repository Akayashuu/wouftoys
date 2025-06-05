"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, CreditCard, Truck } from "lucide-react"
import Link from "next/link"

const steps = [
    { id: 1, title: "Informations personnelles", icon: "👤" },
    { id: 2, title: "Livraison", icon: "🚚" },
    { id: 3, title: "Paiement", icon: "💳" },
    { id: 4, title: "Confirmation", icon: "✅" },
]

export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        shippingMethod: "standard",
        paymentMethod: "card",
    })
    const [isProcessing, setIsProcessing] = useState(false)

    const { items, getCartTotal, clearCart } = useCart()
    const router = useRouter()

    if (items.length === 0) {
        router.push("/cart")
        return null
    }

    const shippingCost = getCartTotal() >= 50 ? 0 : 4.99
    const totalWithShipping = getCartTotal() + shippingCost

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const validateStep = (step: number) => {
        switch (step) {
            case 1:
                return (
                    formData.firstName &&
                    formData.lastName &&
                    formData.email &&
                    formData.phone &&
                    formData.address &&
                    formData.city &&
                    formData.postalCode
                )
            case 2:
                return formData.shippingMethod
            case 3:
                return formData.paymentMethod
            default:
                return true
        }
    }

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep === 3) {
                handlePayment()
            } else {
                setCurrentStep((prev) => prev + 1)
            }
        }
    }

    const handlePayment = async () => {
        setIsProcessing(true)

        // Simulation du paiement
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Vider le panier et rediriger vers la confirmation
        clearCart()
        router.push("/checkout/confirmation")
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Prénom *</Label>
                                <Input
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                                    placeholder="Votre prénom"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Nom *</Label>
                                <Input
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                                    placeholder="Votre nom"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder="votre@email.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone *</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                placeholder="06 12 34 56 78"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Adresse *</Label>
                            <Input
                                id="address"
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                                placeholder="123 rue de la Paix"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">Ville *</Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => handleInputChange("city", e.target.value)}
                                    placeholder="Paris"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="postalCode">Code postal *</Label>
                                <Input
                                    id="postalCode"
                                    value={formData.postalCode}
                                    onChange={(e) =>
                                        handleInputChange("postalCode", e.target.value)
                                    }
                                    placeholder="75001"
                                />
                            </div>
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">
                            Choisissez votre mode de livraison
                        </h3>
                        <RadioGroup
                            value={formData.shippingMethod}
                            onValueChange={(value) => handleInputChange("shippingMethod", value)}
                        >
                            <div className="flex items-center space-x-2 p-4 border rounded-lg">
                                <RadioGroupItem value="standard" id="standard" />
                                <Label htmlFor="standard" className="flex-1 cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Truck className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="font-medium">Livraison standard</p>
                                                <p className="text-sm text-gray-600">
                                                    2-3 jours ouvrés
                                                </p>
                                            </div>
                                        </div>
                                        <span className="font-medium">
                                            {getCartTotal() >= 50 ? "Gratuite" : "4,99 €"}
                                        </span>
                                    </div>
                                </Label>
                            </div>
                        </RadioGroup>

                        {getCartTotal() < 50 && (
                            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                                💡 Ajoutez {(50 - getCartTotal()).toFixed(2)} € à votre commande
                                pour bénéficier de la livraison gratuite !
                            </p>
                        )}
                    </div>
                )

            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Choisissez votre mode de paiement</h3>
                        <RadioGroup
                            value={formData.paymentMethod}
                            onValueChange={(value) => handleInputChange("paymentMethod", value)}
                        >
                            <div className="flex items-center space-x-2 p-4 border rounded-lg">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card" className="flex-1 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-5 w-5 text-blue-600" />
                                        <div>
                                            <p className="font-medium">Carte bancaire</p>
                                            <p className="text-sm text-gray-600">
                                                Paiement sécurisé (simulation)
                                            </p>
                                        </div>
                                    </div>
                                </Label>
                            </div>
                        </RadioGroup>

                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <p className="text-sm text-yellow-800">
                                <strong>Mode démonstration :</strong> Aucun paiement réel ne sera
                                effectué. Ceci est une simulation à des fins pédagogiques.
                            </p>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button variant="ghost" asChild className="mb-6">
                <Link href="/cart">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour au panier
                </Link>
            </Button>

            <h1 className="text-3xl font-bold mb-8">Finaliser ma commande</h1>

            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                            <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
                                    currentStep >= step.id
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-600"
                                }`}
                            >
                                {currentStep > step.id ? "✓" : step.id}
                            </div>
                            <div className="ml-3 hidden sm:block">
                                <p
                                    className={`text-sm font-medium ${currentStep >= step.id ? "text-blue-600" : "text-gray-500"}`}
                                >
                                    {step.title}
                                </p>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`w-12 h-0.5 mx-4 ${currentStep > step.id ? "bg-blue-600" : "bg-gray-200"}`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">{steps[currentStep - 1].icon}</span>
                                {steps[currentStep - 1].title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {renderStepContent()}

                            <div className="flex justify-between mt-8">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentStep((prev) => prev - 1)}
                                    disabled={currentStep === 1}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Précédent
                                </Button>

                                <Button
                                    onClick={handleNext}
                                    disabled={!validateStep(currentStep) || isProcessing}
                                >
                                    {isProcessing ? (
                                        "Traitement en cours..."
                                    ) : currentStep === 3 ? (
                                        "Finaliser la commande"
                                    ) : (
                                        <>
                                            Suivant
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-4">
                        <CardHeader>
                            <CardTitle>Récapitulatif</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span>
                                            {item.name} x{item.quantity}
                                        </span>
                                        <span>{(item.price * item.quantity).toFixed(2)} €</span>
                                    </div>
                                ))}
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Sous-total</span>
                                    <span>{getCartTotal().toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Livraison</span>
                                    <span>
                                        {shippingCost === 0 ? (
                                            <span className="text-green-600">Gratuite</span>
                                        ) : (
                                            `${shippingCost.toFixed(2)} €`
                                        )}
                                    </span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>{totalWithShipping.toFixed(2)} €</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
