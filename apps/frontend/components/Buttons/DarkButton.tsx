import { ReactNode } from "react"

type DarkButtonProps = {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}

export const DarkButton = ({ children, onClick, size = "small" } : DarkButtonProps) => {
    return <div onClick={onClick} className={`flex flex-col justify-center px-8 py-2 cursor-pointer hover:shadow-md bg-purple-800 text-white rounded text-center`}>
        {children}
    </div>
}