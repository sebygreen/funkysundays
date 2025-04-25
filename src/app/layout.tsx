import Menu from "@/components/layout/Menu";
import Toasts from "@/components/common/Toasts";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ToastProvider from "@/context/Toast";
import { Satoshi } from "@/utilities/fonts";
import type { Metadata, Viewport } from "next";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import Script from "next/script";
import { ReactNode } from "react";
import "./globals.css";

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
                <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
                    <ToastProvider>
                        <Toasts />
                        <Menu />
                        <div id="layout">
                            <Header />
                            <main>
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </ToastProvider>
                </ReCaptchaProvider>
            </body>
            <Script defer data-domain="funkysundays.com" src={"https://plausible.smkg.me/js/script.js"} />
        </html>
    );
}
