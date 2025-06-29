import { LoaderFunctionArgs, json, MetaFunction } from "@remix-run/node";
import React, { useMemo } from "react";
import { MDXComponents } from "mdx/types";
import { useLoaderData } from "@remix-run/react";
import { MDXProvider } from "@mdx-js/react";
import Navigation from "~/components/Navigation";
import Footer from "~/components/Footer";

type MDXModule = {
  default: React.ComponentType;
  meta?: {
    title?: string;
    description?: string;
    date?: string;
  }
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const postFiles = import.meta.glob("../content/posts/*.mdx");
  const matchKey = Object.keys(postFiles).find((key) =>
    key.endsWith(`/${params.slug}.mdx`)
  );
  if (!matchKey) {
    console.error("No matching file for slug:", params.slug);
    throw new Response("Post not found", { status: 404 });
  }
  const mod = await postFiles[matchKey]() as MDXModule;
  return json({
    meta: mod?.meta ?? {},
    matchKey,
  });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Not Found" }];
  return [
    { title: `${data.meta.title} | TheDiabeticDev` },
    { name: "description", content: data.meta.description ?? "" },
  ];
};


const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="text-xl md:text-2xl font-semibold font-serif text-stone-600 dark:text-stone-200" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-lg md:text-xl font-semibold font-serif text-stone-600 dark:text-stone-300" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-md md:text-lg font-semibold font-serif text-stone-600 dark:text-stone-400" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => <p className="mb-4" {...props}>{children}</p>,
  ul: ({ children, ...props }) => <ul className="mb-4" {...props}>{children}</ul>,
  li: ({ children, ...props }) => <li className="mb-2" {...props}>{children}</li>,
  a: ({ children, ...props }) => {
    const content = children || props.href || "Link";
    return (
      <a className="text-blue-500 underline" target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  },
};

export default function BlogPost() {
  const { meta, matchKey } = useLoaderData<typeof loader>();

  const postFiles = import.meta.glob("../content/posts/*.mdx");
  const Component = useMemo(
    () =>
      React.lazy(() =>
        (postFiles[matchKey]!() as Promise<MDXModule>).then((mod) => ({
          default: mod.default,
        }))
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [matchKey]
  );

  return (
    <>
      <Navigation />
      <main className="prose dark:prose-invert mx-auto px-4 py-4">
        <h1 className="text-2xl md:text-4xl font-[900] text-green-600 dark:text-white font-serif">{meta.title}</h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">Date Published: {meta.date}</p>
        <MDXProvider components={components}>
          <React.Suspense fallback={<p>Loading...</p>}>
            <Component />
          </React.Suspense>
        </MDXProvider>
      </main>
      <Footer />
    </>
  );
}

