// Tooltip.tsx
export default function Tooltip({
    children,
    label,
    position = "top",
}: {
    children: React.ReactNode;
    label: string;
    position?: "top" | "bottom" | "left" | "right";
}) {
    const positionClasses: Record<string, string> = {
        top: "bottom-full mb-1 left-1/2 -translate-x-1/2",
        bottom: "top-full mt-1 left-1/2 -translate-x-1/2",
        left: "right-full mr-1 top-1/2 -translate-y-1/2",
        right: "left-full ml-1 top-1/2 -translate-y-1/2",
    };

    return (
        <div className="relative group inline-block">
            {children}
            <div
                className={`
          absolute z-10 px-2 py-1 text-sm text-white border border-stone-800 bg-gradient-to-b from-stone-800 to-stone-950 rounded 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 
          pointer-events-none whitespace-nowrap 
          ${positionClasses[position]}
        `}
            >
                {label}
            </div>
        </div>
    );
}
