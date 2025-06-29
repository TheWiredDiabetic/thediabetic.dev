import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { OctagonAlert, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="overflow-x-hidden">
        <main className="w-full max-w-[55rem] px-8 mt-8 lg:mt-12 mx-auto">
          {children}
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        document.title = "404 - Not Found";
      } else {
        document.title = `Error ${error.status}`;
      }
    }
  }, [error]);
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="p-8 text-center">
          <OctagonAlert size="64" className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">404 - Not Found</h1>
          <p className="text-lg text-gray-500">The page you&apos;re looking for doesn’t exist &ndash; <i>*insert sad trombone*</i></p>
          <p className="text-lg text-gray-500">Here, have a cookie 🍪, for your troubles.</p>
          <div className="flex flex-col md:flex-row gap-2 justify-center md:justify-between mt-8">
            <a href="/" className="w-full flex items-center px-2 py-2 border border-stone-500 rounded-md text-lg text-stone-500 hover:border-stone-300 hover:text-stone-300 transition duration-200">
              <ArrowLeft className="inline-block mr-2" />
              <span className="inline-block font-light">Return Home</span>
            </a>
            <a href="https://github.com/TheWiredDiabetic/thediabetic.dev/issues" className="w-full flex items-center px-2 py-2 border border-stone-500 rounded-md text-lg text-stone-500 hover:border-stone-300 hover:text-stone-300 transition duration-200">
              <ArrowRight className="inline-block mr-2" />
              <span className="inline-block font-light">Constantly getting this error?</span>
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Error {error.status}</h1>
        <p className="text-lg text-gray-500">{error.statusText}</p>
        <div className="flex flex-col md:flex-row gap-2 justify-center md:justify-between mt-8">
          <a href="/" className="w-full flex items-center px-2 py-2 border border-stone-500 rounded-md text-lg text-stone-500 hover:border-stone-300 hover:text-stone-300 transition duration-200">
            <ArrowLeft className="inline-block mr-2" />
            <span className="inline-block font-light">Return Home</span>
          </a>
          <a href="https://github.com/TheWiredDiabetic/thediabetic.dev/issues" className="w-full flex items-center px-2 py-2 border border-stone-500 rounded-md text-lg text-stone-500 hover:border-stone-300 hover:text-stone-300 transition duration-200">
            <ArrowRight className="inline-block mr-2" />
            <span className="inline-block font-light">Constantly getting this error?</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-center">
      <OctagonAlert size="64" className="mx-auto mb-4" />
      <h1 className="text-4xl font-bold mb-2">Something went wrong</h1>
      <p className="text-lg text-gray-500">
        An unexpected error occurred. Please try again later.
      </p>
      <p className="text-lg text-gray-500">
        As thou, with every other error: here&apos; a cookie 🍪 for your troubles.
      </p>
      <div className="flex flex-col md:flex-row gap-2 justify-center md:justify-between mt-8">
        <a href="/" className="w-full flex items-center px-2 py-2 border border-stone-500 rounded-md text-lg text-stone-500 hover:border-stone-300 hover:text-stone-300 transition duration-200">
          <ArrowLeft className="inline-block mr-2" />
          <span className="inline-block font-light">Return Home</span>
        </a>
        <a href="https://github.com/TheWiredDiabetic/thediabetic.dev/issues" className="w-full flex items-center px-2 py-2 border border-stone-500 rounded-md text-lg text-stone-500 hover:border-stone-300 hover:text-stone-300 transition duration-200">
          <ArrowRight className="inline-block mr-2" />
          <span className="inline-block font-light">Constantly getting this error?</span>
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return <Outlet />;
}
