import Image from "next/image"
import { Play, Gift, Users, Award, Sparkles, Star } from "lucide-react"
import { GradientButton } from "@/components/ui/button/gradient-button"
import { ProductCard } from "@/components/ui/product-card"

const featuredProducts = [
    {
        id: 1,
        name: "Balle rebondissante",
        price: 5.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 124,
        badge: "🏆 Best-seller",
    },
    {
        id: 4,
        name: "Peluche renard",
        price: 9.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 89,
        badge: "💝 Coup de cœur",
    },
    {
        id: 6,
        name: "Jouet distributeur de friandises",
        price: 12.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 156,
        badge: "🧠 Intelligent",
    },
]

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 opacity-90" />
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-bounce" />
                    <div className="absolute top-32 right-20 w-16 h-16 bg-white/15 rounded-full animate-pulse" />
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/25 rounded-full animate-bounce delay-300" />
                </div>

                <div className="relative container mx-auto px-4 py-24 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 text-white">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                    <Sparkles className="h-5 w-5" />
                                    <span className="text-sm font-medium">
                                        Le paradis des toutous
                                    </span>
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                                    Wouf !<br />
                                    <span className="text-yellow-200">Des jouets</span>
                                    <br />
                                    qui font vibrer
                                    <br />
                                    <span className="text-green-200">la queue !</span>
                                </h1>
                            </div>
                            <p className="text-xl lg:text-2xl text-orange-100 font-medium">
                                Transformez chaque moment en aventure épique avec nos jouets
                                ultra-résistants !
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <GradientButton
                                    href="/products"
                                    icon={Play}
                                    variant="primary"
                                    size="lg"
                                >
                                    C&apos;est parti pour jouer !
                                </GradientButton>
                                <GradientButton icon={Gift} variant="outline" size="lg">
                                    Voir les nouveautés
                                </GradientButton>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative z-10">
                                <Image
                                    src="/placeholder.svg?height=600&width=600"
                                    alt="Chien heureux avec ses jouets"
                                    width={600}
                                    height={600}
                                    className="rounded-3xl shadow-2xl"
                                />
                            </div>
                            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-yellow-300 to-orange-300 rounded-3xl -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Fun Stats - Gardé tel quel car spécifique à cette page */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center space-y-3">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto text-3xl">
                                <Play className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">10,000+</h3>
                            <p className="text-gray-600 font-medium">Toutous heureux</p>
                        </div>
                        <div className="text-center space-y-3">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto text-3xl">
                                <Sparkles className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">24h</h3>
                            <p className="text-gray-600 font-medium">Livraison express</p>
                        </div>
                        <div className="text-center space-y-3">
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto text-3xl">
                                <Award className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">100%</h3>
                            <p className="text-gray-600 font-medium">Qualité garantie</p>
                        </div>
                        <div className="text-center space-y-3">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-green-400 rounded-full flex items-center justify-center mx-auto text-3xl">
                                <Gift className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">30j</h3>
                            <p className="text-gray-600 font-medium">Satisfait ou remboursé</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-6 py-3 mb-6">
                            <Award className="h-6 w-6 text-orange-600" />
                            <span className="text-orange-600 font-bold">Sélection du chef</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 bg-clip-text text-transparent">
                            Les stars du moment
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Ces jouets font craquer tous les chiens ! Découvrez pourquoi ils sont si
                            populaires <Star />
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {featuredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <GradientButton href="/products" icon={Users} variant="secondary" size="lg">
                            Voir toute la bande !
                        </GradientButton>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/15 rounded-full animate-bounce" />
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/20 rounded-full animate-ping" />
                </div>

                <div className="relative container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h2 className="text-4xl lg:text-6xl font-black leading-tight">
                            Offrez-lui des moments de pur bonheur&nbsp;!
                            <br />
                            <span className="text-green-200">Votre chien va adorer</span>
                        </h2>
                        <p className="text-2xl font-medium text-orange-100 flex items-center justify-center gap-2">
                            <Users className="w-8 h-8" />
                            Rejoignez la plus grande communauté de chiens heureux !
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <GradientButton
                                href="/products"
                                icon={Play}
                                variant="primary"
                                size="lg"
                                className="text-xl px-10 py-6"
                            >
                                Commencer l&apos;aventure !
                            </GradientButton>
                            <GradientButton
                                icon={Gift}
                                variant="outline"
                                size="lg"
                                className="text-xl px-10 py-6"
                            >
                                Offrir un cadeau
                            </GradientButton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
