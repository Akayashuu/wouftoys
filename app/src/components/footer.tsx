import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, Zap } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-orange-900 to-yellow-900 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse" />
                <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce" />
                <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-ping" />
            </div>

            <div className="relative container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center">
                                <span className="text-white font-bold text-2xl">🐾</span>
                            </div>
                            <div>
                                <span className="font-black text-2xl text-yellow-300">
                                    WoufToys
                                </span>
                                <div className="text-xs text-orange-200">
                                    Le paradis des toutous
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            🎾 Depuis 2020, nous rendons les chiens heureux avec des jouets de
                            qualité exceptionnelle. Parce que chaque toutou mérite le meilleur !
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="#"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                            >
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="font-black text-xl text-yellow-300 flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            Navigation
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors flex items-center gap-2"
                                >
                                    🏠 Accueil
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors flex items-center gap-2"
                                >
                                    🎾 Nos jouets
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors flex items-center gap-2"
                                >
                                    🐕 Notre histoire
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors flex items-center gap-2"
                                >
                                    📝 Blog toutou
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-6">
                        <h3 className="font-black text-xl text-yellow-300 flex items-center gap-2">
                            <Heart className="h-5 w-5" />
                            Aide & Support
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors flex items-center gap-2"
                                >
                                    ❓ Questions fréquentes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors flex items-center gap-2"
                                >
                                    🚚 Livraison express
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors flex items-center gap-2"
                                >
                                    🛡️ Garantie qualité
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors flex items-center gap-2"
                                >
                                    💬 Chat en direct
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="font-black text-xl text-yellow-300">🎯 Nous contacter</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                                <Mail className="h-5 w-5 text-orange-400" />
                                <div>
                                    <div className="text-sm text-gray-400">Email</div>
                                    <span className="text-white font-medium">
                                        woof@wouf-toys.fr
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                                <Phone className="h-5 w-5 text-green-400" />
                                <div>
                                    <div className="text-sm text-gray-400">Téléphone</div>
                                    <span className="text-white font-medium">01 WOOF WOOF</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                                <MapPin className="h-5 w-5 text-yellow-400" />
                                <div>
                                    <div className="text-sm text-gray-400">Adresse</div>
                                    <span className="text-white font-medium">
                                        123 rue des Toutous
                                        <br />
                                        75001 Paris
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/20 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm flex items-center gap-2">
                            © 2024 WoufToys - Fait avec <Heart className="h-4 w-4 text-red-400" />{" "}
                            pour nos amis à quatre pattes
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-yellow-300 text-sm transition-colors"
                            >
                                📋 Mentions légales
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-yellow-300 text-sm transition-colors"
                            >
                                🔒 Confidentialité
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-yellow-300 text-sm transition-colors"
                            >
                                📜 CGV
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
