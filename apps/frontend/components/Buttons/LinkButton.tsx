"use client";
import { ReactNode } from "react"

type LinkButtonProps = {
    children: ReactNode, 
    onClick: () => void 
}

export const LinkButton = ({ children, onClick } : LinkButtonProps) => {
    return <div className="flex justify-center px-2 py-2 cursor-pointer hover:bg-slate-100 font-light text-sm rounded" onClick={onClick}>
        {children}
    </div>
}