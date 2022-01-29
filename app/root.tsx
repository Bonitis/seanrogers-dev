import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./tailwind.css";
import rootStyles from "../styles/root.css";
import { useCallback, useEffect, useState } from "react";
import darkmode from '../assets/icons/darkmode.svg';
import lightmode from '../assets/icons/lightmode.svg';

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: rootStyles },
    {
      rel: "preload",
      href: darkmode,
      as: "image",
      type: "image/svg+xml"
    },
    {
      rel: "preload",
      href: lightmode,
      as: "image",
      type: "image/svg+xml"
    }
  ];
}

export const meta: MetaFunction = () => {
  return {
    title: "Sean Rogers",
    description: "Software engineer and ex-founder with expertise in javascript/typescript, react, and building micro-service architecture.",
    keywords: "javascript,typescript,react,node,micro-service,micro-frontend"
  };
};

const THEME_KEY = 'dark_mode';
enum Theme {
  LIGHT="light",
  DARK="dark"
}

export const updateTheme = (theme: Theme) => {
  localStorage.setItem(THEME_KEY, theme);
}

export default function App() {
  const [theme, setTheme] = useState<string>(Theme.LIGHT);
  
  useEffect(() => {
    setTheme(localStorage.getItem(THEME_KEY) || Theme.LIGHT);
  }, [])

  const handleTheme = useCallback(() => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    setTheme(newTheme);
    updateTheme(newTheme)
  }, [theme])

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300&display=swap" rel="stylesheet" />
        <Meta />
        <Links />
      </head>
      <body className="dark:bg-slate-900 bg-white transition-colors relative">
        <nav className="w-10/12 max-w-5xl h-16 mx-auto mb-8 flex items-center justify-between py-4 dark:text-white text-slate-800">
          <Link prefetch="intent" to="/" className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700">Home</Link>
          <button
            title={theme === Theme.LIGHT ? 'dark mode' : 'light mode'}
            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
            onClick={handleTheme}
          >
            <div className="dark:invert" style={{ backgroundImage: `url(${theme === Theme.LIGHT ? darkmode : lightmode})`, height: '24px', width: '24px'}} />
          </button>
        </nav>
        <Outlet />
        <footer className="dark:text-white text-slate-800 w-full mt-16 py-12">
          <div className="md:p-0 w-full md:w-10/12 flex flex-col md:flex-row justify-between max-w-5xl mx-8 md:mx-auto">
            <div>&copy;{` ${new Date().getFullYear()} Sean Rogers `}</div>
            <div>Social Links</div>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
