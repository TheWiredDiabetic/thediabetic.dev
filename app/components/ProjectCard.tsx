const languageColors = {
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "JavaScript": "#f1e05a",
    "TypeScript": "#007acc",
    "Python": "#3572A5",
    "Java": "#b07219",
    "C#": "#178600",
    "C++": "#f34b7d",
    "C": "#555555", 
}

export default function ProjectCard({
  icon,
  name,
  description,
  language,
  link,
}: {
  icon: string; // image or SVG path
  name: string;
  description: string;
  language: keyof typeof languageColors;
  link: string;
}) {
  return (
    <div className="card-wrapper block">
      <a
        href={link}
        className="block border border-zinc-200 dark:border-zinc-700 relative overflow-hidden rounded-2xl px-6 py-4 bg-white dark:bg-zinc-900 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <img
            src={icon}
            alt=""
            className="object-cover w-full h-full rounded-2xl blur-md"
          />
        </div>
        <div className="relative z-10 space-y-1">
          <h2 className="text-md md:text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            {name}
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">{description}</p>
          <span className="inline-flex items-center text-xs mt-2 px-2 py-1 bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded">
            <span
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: languageColors[language] }}
            />
            {language}
          </span>
        </div>
      </a>
    </div>
  );
}
