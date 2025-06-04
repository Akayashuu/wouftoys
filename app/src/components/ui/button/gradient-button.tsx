import { Button } from "@/components/ui/button/button"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface GradientButtonProps {
    href?: string
    children: React.ReactNode
    icon?: LucideIcon
    variant?: "primary" | "secondary" | "outline"
    size?: "sm" | "md" | "lg"
    className?: string
    onClick?: () => void
}

export function GradientButton({
    href,
    children,
    icon: Icon,
    variant = "primary",
    size = "md",
    className = "",
    onClick,
}: GradientButtonProps) {
    const baseClasses = "font-bold rounded-2xl border-0 transition-all transform hover:scale-105"

    const variantClasses = {
        primary:
            "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl",
        secondary:
            "bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white",
        outline: "border-2 border-white text-white hover:bg-white hover:text-orange-600",
    }

    const sizeClasses = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    }

    const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

    const content = (
        <>
            {Icon && <Icon className="mr-2 h-5 w-5" />}
            {children}
        </>
    )

    if (href) {
        return (
            <Button asChild size="lg" className={buttonClasses}>
                <Link href={href}>{content}</Link>
            </Button>
        )
    }

    return (
        <Button onClick={onClick} size="lg" className={buttonClasses}>
            {content}
        </Button>
    )
}
