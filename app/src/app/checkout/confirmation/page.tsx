import { Button } from "@/components/ui/button/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"

export default function ConfirmationPage() {
    const orderNumber = `CMD-${Date.now().toString().slice(-6)}`

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                {/* Success Icon */}
                <div className="flex justify-center">
                    <CheckCircle className="h-24 w-24 text-green-500" />
                </div>

                {/* Thank You Message */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-green-600">Commande confirmée !</h1>
                    <p className="text-xl text-gray-600">
                        Merci pour votre achat ! Votre commande a été enregistrée avec succès.
                    </p>
                </div>

                {/* Order Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Détails de votre commande
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Numéro de commande</p>
                            <p className="text-lg font-bold">{orderNumber}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-left">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="font-medium">Confirmation par email</p>
                                        <p className="text-sm text-gray-600">
                                            Un email de confirmation vous a été envoyé
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Truck className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">Livraison estimée</p>
                                        <p className="text-sm text-gray-600">2-3 jours ouvrés</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Next Steps */}
                <Card>
                    <CardHeader>
                        <CardTitle>Prochaines étapes</CardTitle>
                    </CardHeader>
                    <CardContent className="text-left space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    1
                                </div>
                                <div>
                                    <p className="font-medium">Préparation de votre commande</p>
                                    <p className="text-sm text-gray-600">
                                        Nous préparons vos jouets avec soin dans notre entrepôt
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    2
                                </div>
                                <div>
                                    <p className="font-medium">Expédition</p>
                                    <p className="text-sm text-gray-600">
                                        Votre colis sera expédié sous 24h et vous recevrez un numéro
                                        de suivi
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    3
                                </div>
                                <div>
                                    <p className="font-medium">Livraison</p>
                                    <p className="text-sm text-gray-600">
                                        Réception de votre commande à l&apos;adresse indiquée
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                        <Link href="/products">Continuer mes achats</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/">Retour à l&apos;accueil</Link>
                    </Button>
                </div>

                {/* Additional Info */}
                <div className="bg-blue-50 p-6 rounded-lg text-left">
                    <h3 className="font-semibold mb-2">Besoin d&apos;aide ?</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        Si vous avez des questions concernant votre commande, n&apos;hésitez pas à
                        nous contacter :
                    </p>
                    <ul className="text-sm space-y-1">
                        <li>📧 Email : support@dogtoys.fr</li>
                        <li>📞 Téléphone : 01 23 45 67 89</li>
                        <li>🕒 Du lundi au vendredi, 9h-18h</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
