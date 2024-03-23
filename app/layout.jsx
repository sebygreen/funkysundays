import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Overlay from "@/components/client/Overlay";
import { satoshi } from "@/lib/fonts";
import "./globals.css";
import Script from "next/script";

export const viewport = {
    themeColor: "#121212",
};

export const metadata = {
    title: "Funky Sundays",
    description:
        "La famille Funky Sundays, basée à Genève, compte aujourd’hui 12 membres bénévoles et nous sommes motivés à créer ensemble le meilleur rendez-vous dominical de l’année pour toutes et tous.",
};

export default function Layout({ children }) {
    return (
        <html lang="fr">
            <body className={satoshi.className}>
                <Overlay />
                <div className="layout">
                    <Header />
                    {children}
                    <Footer />
                </div>
            </body>
            <Script
                async
                src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            />
            <Script
                async
                //src="https://umami.smkg.me/script.js"
                data-website-id="f29a55dc-c3c6-4ad6-a9ff-4d8d97679cb6"
            />
        </html>
    );
}
