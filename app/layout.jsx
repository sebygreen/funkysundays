import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Overlay from "@/components/client/Overlay";
import { satoshi } from "@/lib/fonts";
import "./globals.css";
import Script from "next/script";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import fr from "dayjs/locale/fr";
import utc from "dayjs/plugin/utc";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.locale(fr);

export const viewport = {
    themeColor: "#121212",
};

export const metadata = {
    title: "Funky Sundays",
    description:
        "La famille Funky Sundays, basée à Genève, compte aujourd’hui 13 membres bénévoles et nous sommes motivés à créer ensemble le meilleur rendez-vous dominical de l’année pour toutes et tous.",
    "format-detection": "telephone=no, date=no, address=no, email=no, url=no",
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
            <Script defer data-domain="funkysundays.com" src={"https://plausible.smkg.me/js/script.js"} />
        </html>
    );
}
