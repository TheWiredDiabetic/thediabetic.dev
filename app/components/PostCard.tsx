export default function PostCard({
  title, 
  description,
  date,
  link
}: {
  title?: string;
  description?: string;
  date?: string;
  link?: string;
}) {
  return (
    <div className="card-wrapper block">
      <a
        href={link}
        className="block border border-zinc-200 dark:border-zinc-700 relative overflow-hidden rounded-2xl px-6 py-4 bg-white dark:bg-zinc-900 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative z-10 space-y-1">
          <h2 className="text-md md:text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            {title}
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            {description?.substring(0, 100) + "..."}
          </p>
          <span className="inline-flex items-center text-xs mt-2 px-2 py-1 bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded">
            {date}
          </span>
        </div>
      </a>
    </div>
  );
}
