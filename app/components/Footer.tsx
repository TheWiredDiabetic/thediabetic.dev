import Tooltip from "./Tooltip"

export default function Footer() {
    return (
        <footer className="mt-8 w-full flex flex-row items-center justify-between">
            <p className="text-xs md:text-md font-bold text-zinc-700 dark:text-zinc-400">
                &copy; {new Date().getFullYear()} TheDiabeticDev (Taylor)
            </p>
            <a href="https://github.com/TheWiredDiabetic/thediabetic.dev">
                <Tooltip label="Yes, I'm actually open source!" position="bottom">
                    <p className="text-xs md:text-sm font-medium text-zinc-700 dark:text-zinc-400">
                        Source Code
                    </p>
                </Tooltip>
            </a>
        </footer>
    )
}