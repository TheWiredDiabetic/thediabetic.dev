import ProjectCard from "~/components/ProjectCard";
import Navigation from "~/components/Navigation";
import PostCard from "~/components/PostCard";
import Tooltip from "~/components/Tooltip";
import Footer from "~/components/Footer";

import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import * as Icons from "~/components/icons";
import { Code, Clock } from "lucide-react";

import { useEffect, useState, useRef } from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "Home | TheDiabeticDev" },
        { name: "description", content: "Welcome to Remix!" },
        { name: "og:image", content: "https://avatars.githubusercontent.com/u/102403512" },
    ];
};

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
        description?: string;
        hidden?: boolean
    }
}

export const loader: LoaderFunction = async () => {
    // Load posts
    const postFiles = import.meta.glob("../content/posts/*.mdx");
    const posts = await Promise.all(
        Object.entries(postFiles).map(async ([path, resolver]) => {
            const slug = path.split("/").pop()?.replace(/\.mdx$/, "");
            const mod = (await resolver()) as MDXModPost;
            return {
                slug,
                title: mod.meta?.title || slug,
                date: mod.meta?.date,
                description: mod.meta?.description,
                hidden: mod.meta?.hidden
            };
        })
    );
    return { posts };
};

export default function Index() {
    const { posts } = useLoaderData<typeof loader>();
    const [time, setTime] = useState(new Date());
    const timesClicked = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function playEasterEggSFX() {
        const sound = new Audio("/HouseMDHuh.mp3");
        sound.play();
        timesClicked.current += 1;
        console.log("Times clicked: " + timesClicked.current);
        if (timesClicked.current === 10) {
            const sound = new Audio("/OurHouse.mp3");
            sound.play();
            sound.loop = true;
            setTimeout(() => {
                alert("Alright, alright - enough: you've unlocked the our house sound. Hope your happy.");
                window.location.reload();
            }, 1000);
            timesClicked.current = 0;
        }
    }

    return (
        <>
            <Navigation />
            <div className="header px-5">
                <div className="flex flex-col items-center md:items-start md:flex-row">
                    <Tooltip label="Click me!" position="bottom">
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                        <img onClick={() => playEasterEggSFX()} src="https://avatars.githubusercontent.com/u/107991832?v=4" alt="GitHub Avatar" className="avatar cursor-pointer w-24 h-24 rounded-full hover:animate-spin duration-75" />
                    </Tooltip>
                    <div className="flex flex-col items-center md:items-start md:ml-4">
                        <h4>Hi, I&apos;m</h4>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif lowercase font-black">taylor 👋</h1>
                    </div>
                </div>
                <div className="flex flex-col mt-2 items-center gap-2 justify-between md:flex-row">
                    <div className="flex items-center gap-2 justify-evenly">
                        <Code className="w-6 h-6" />
                        <p className="font-mono text-md font-normal">
                            Fullstack Developer
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Tooltip label="Roblox" position="bottom">
                            <Link to="https://www.roblox.com/users/313762667/profile" className="group flex items-center gap-3 self-stretch p-3 leading-normal hover:rotate-12 transition-all duration-300">
                                <Icons.Roblox className="w-6 h-6 fill-current stroke-current" />
                            </Link>
                        </Tooltip>
                        <Tooltip label="X" position="bottom">
                            <Link to="https://x.com/TaylorTheType1" className="group flex items-center gap-3 self-stretch p-3 leading-normal hover:rotate-12 transition-all duration-300">
                                <Icons.X className="w-6 h-6 fill-current stroke-current" />
                            </Link>
                        </Tooltip>
                        <Tooltip label="Github" position="bottom">
                            <Link to="https://github.com/TheWiredDiabetic" className="group flex items-center gap-3 self-stretch p-3 leading-normal hover:rotate-12 transition-all duration-300">
                                <Icons.Github className="w-6 h-6 fill-current stroke-current" />
                            </Link>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className="content px-5">
                <div id="about-me" className="py-5">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-serif font-light">About Me</h1>
                        <div className="h-[1.25px] grow bg-stone-300 dark:bg-stone-600"></div>
                        <div className="local-time flex items-center gap-2">
                            <Clock />
                            <Tooltip label="Current Time" position="bottom">
                                <span className="">{new Intl.DateTimeFormat("en-IE", { hour: "numeric", minute: "numeric", hour12: true }).format(time) || "--:--"}</span>
                            </Tooltip>
                        </div>
                    </div>
                    <p className="px-2 py-2 text-md">I&apos;m Taylor, also known as TheWiredDiabetic on Github. I&apos;m a fullstack developer who lives in Ireland and like to program various different web applications or code projects and work with various different frameworks, services & languages.</p>
                </div>
                <div id="what-im-working-on" className="py-5">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-serif font-light">What I&apos;m Working On</h1>
                        <div className="h-[1.25px] grow bg-stone-300 dark:bg-stone-600"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 px-2 py-2 gap-4">
                        <ProjectCard
                            icon='/trachtrail.png'
                            name="TráchtRail"
                            description="A web app built around the Irish Rail API providing real time info on trains and stations, built entirely with React and TypeScript."
                            language="TypeScript"
                            link="https://rail.thediabetic.dev/"
                        />
                    </div>
                </div>
                <div id="posts" className="py-5">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-serif font-light">Posts</h1>
                        <div className="h-[1.25px] grow bg-stone-300 dark:bg-stone-600"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 px-2 py-2 gap-4">
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
                    </div>
                </div>
                <div id="my-interests" className="py-5">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-serif font-light">My Interests & Hobbies</h1>
                        <div className="h-[1.25px] grow bg-stone-300 dark:bg-stone-600"></div>
                    </div>
                    <ul className="px-2 py-2 text-md list-inside list-disc">
                        <li>🚆 Trainspotting;</li>
                        <li>📺 TV Shows, such as House M.D.;</li>
                        <li>🎮 Gaming;</li>
                        <li>⚙️ Programming;</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
}