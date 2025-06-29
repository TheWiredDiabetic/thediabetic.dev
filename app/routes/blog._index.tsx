import { useLoaderData } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";
import Navigation from "~/components/Navigation";
import PostCard from "~/components/PostCard";
import Footer from "~/components/Footer";

type MDXPost = {
    title?: string;
    date?: string;
    slug?: string;
    hidden?: boolean;
    description?: string;
}

type MDXModPost = {
    meta?: {
        title?: string;
        date?: string;
        hidden?: boolean;
        description?: string;
    }
}

export const loader = async () => {
    const files = import.meta.glob("../content/posts/*.mdx");
    const posts = await Promise.all(
        Object.entries(files).map(async ([path, resolver]) => {
            const slug = path.split("/").pop()?.replace(/\.mdx$/, "");
            const mod = (await resolver()) as MDXModPost;
            return {
                slug,
                title: mod.meta?.title || slug,
                date: mod.meta?.date,
                hidden: mod.meta?.hidden,
                description: mod.meta?.description
            }
        }
        ));
    console.log(posts);
    return posts;
}

export const meta: MetaFunction = () => {
    return [
        { title: "Posts | TheDiabeticDev" },
        { name: "description", content: "View any posted MDX posts." },
    ]
};

export default function Posts() {
    const posts = useLoaderData<typeof loader>();
    return (
        <>
            <Navigation />
            <main className="max-w-3xl mx-auto">
                <h1 className="text-2xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">Posts</h1>
                <p className="text-md md:text-lg text-stone-600 dark:text-stone-400">
                    Some posts may not appear if they are set to be hidden in the .mdx file themselves.
                </p>
                <ul className="mt-4">
                    {(posts === undefined || posts.length === 0) ? (
                        <p className="text-center col-span-2 px-2 py-2 text-md">
                            Hmm... there seems to be no posts to load...
                        </p>
                    ) : (
                        posts
                            .filter((post: MDXPost) => !post.hidden)
                            .map((post: MDXPost) => (
                                <PostCard
                                    key={post.slug}
                                    title={post.title}
                                    description={post.description}
                                    date={post.date}
                                    link={`/blog/${post.slug}`}
                                />
                            ))
                    )}
                </ul>
            </main>
            <Footer />
        </>
    )
}