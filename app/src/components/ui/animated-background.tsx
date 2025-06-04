import type React from "react"

interface AnimatedBackgroundProps {
    children: React.ReactNode
    className?: string
    showFloatingElements?: boolean
}

export function AnimatedBackground({
    children,
    className = "",
    showFloatingElements = true,
}: AnimatedBackgroundProps) {
    return (
        <section className={`relative overflow-hidden ${className}`}>
            {showFloatingElements && (
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-bounce" />
                    <div className="absolute top-32 right-20 w-16 h-16 bg-white/15 rounded-full animate-pulse" />
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/25 rounded-full animate-bounce delay-300" />
                </div>
            )}
            {children}
        </section>
    )
}
