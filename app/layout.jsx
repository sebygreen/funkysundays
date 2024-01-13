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
    description: "Bring Sunday back to life.",
};

export default function Layout({ children }) {
    return (
        <html lang="fr">
            {/*<Script async src="https://umami.smkg.me/script.js" data-website-id="f29a55dc-c3c6-4ad6-a9ff-4d8d97679cb6"/>*/}
            <body className={satoshi.className}>
                <Overlay />
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
