import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Menu from "@/components/client/Menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Satoshi } from "@/utilities/fonts";
import Script from "next/script";

export const viewport: Viewport = {
    themeColor: "#191919",
    colorScheme: "dark",
};

export const metadata: Metadata = {
    title: {
        template: "Funky Sundays • %s",
        default: "Funky Sundays",
    },
    description: "Le meilleur rendez-vous dominical de l’année pour toutes et tous.",
    generator: "Next.js",
    applicationName: "Funky Sundays",
    authors: [{ name: "Sebastien Green", url: "https://smkg.me" }],
    referrer: "origin-when-cross-origin",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
};

export default function Layout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={Satoshi.className}>
                <Menu />
                <div id="layout">
                    <Header />
                    {children}
                    <Footer />
                </div>
            </body>
            <Script defer data-domain="funkysundays.com" src={"https://plausible.smkg.me/js/script.js"} />
        </html>
    );
}
