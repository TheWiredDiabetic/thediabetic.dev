import { HomeIcon, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [routes, setRoutes] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    setRoutes(window.location.pathname.split("/").filter((x) => x !== ""));
  }, []);

  return (
    <div className="px-4 py-4 flex flex-row items-center space-x-2 text-sm">
      <a href="/" className="flex items-center px-2 py-1.5 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-xl transition">
        <HomeIcon className="w-5 h-5 text-stone-600 dark:text-stone-200" />
      </a>

      {mounted &&
        routes.map((route, index) => {
          const fullPath = "/" + routes.slice(0, index + 1).join("/");

          return (
            <div key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-stone-600 dark:text-stone-200" />
              <a
                href={fullPath}
                className="text-stone-600 dark:text-stone-200 capitalize px-2 py-1.5 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-xl transition"
              >
                {route}
              </a>
            </div>
          );
        })}
    </div>
  );
}
