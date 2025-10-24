import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen py-8 pb-20 sm:py-20`}
    >
      <main className="flex flex-col gap-[32px] min-w-full sm:items-start text-xs md:text-base">
        <Component {...pageProps} />
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
