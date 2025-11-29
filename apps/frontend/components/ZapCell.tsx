
type ZapCellProps = {
    name?: string; 
    index: number;
    onClick: () => void;
}

export const ZapCell = ({
    name,
    index,
    onClick
} : ZapCellProps) => {
    return <div onClick={onClick} className="border border-black py-8 px-8 flex w-[300px] justify-center cursor-pointer">
        <div className="flex text-xl">
            <div className="font-bold">
                {index}. 
            </div>
            <div>
                {name}
            </div>
        </div>
    </div>
}