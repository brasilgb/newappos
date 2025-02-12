import { ReactNode } from "react"

interface ABoxProps {
    children: ReactNode;
    className?: string;
}

const ABoxContainer = ({ children }: ABoxProps) => {
    return (
        <div className="py-4">
            <div className="mx-auto container">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    )
}

const ABoxContent = ({ children, className }: ABoxProps) => {
    return (
        <section className={`${className}`}>
            {children}
        </section>
    )

}

const ABoxHead = ({ children }: ABoxProps) => {
    return (
        <header className="px-2 py-2 flex items-center justify-between border-b">
            {children}
        </header>
    )
}

const ABoxFooter = ({ children, className }: ABoxProps) => {
    return (
        <footer className={`px-2 py-2 flex items-center justify-end ${className}`}>
            {children}
        </footer>
    )
}

export { ABoxContainer, ABoxContent, ABoxHead, ABoxFooter };