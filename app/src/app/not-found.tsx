import { Button } from "@/components/ui/button/button"
import Link from "next/link"
import { Home, Search } from "lucide-react"

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-6xl font-bold text-gray-300">404</h1>
                    <h2 className="text-3xl font-bold">Page non trouvée</h2>
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                        Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Retour à l&apos;accueil
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/products">
                            <Search className="mr-2 h-4 w-4" />
                            Voir nos produits
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
