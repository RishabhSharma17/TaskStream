import { ReactNode } from "react"

type SecondaryButtonProps = {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}

export const SecondaryButton = ({ children, onClick, size = "small" } :SecondaryButtonProps) => {
    return <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 pt-2" : "px-10 py-4"} cursor-pointer hover:shadow-md border text-black border-black rounded-full`}>
        {children}
    </div>
}