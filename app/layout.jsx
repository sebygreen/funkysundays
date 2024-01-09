import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Overlay from "@/components/client/Overlay";
import { satoshi } from "@/lib/fonts";
import "./globals.css";

export const metadata = {
    title: "Funky Sundays",
    description: "Bring Sunday back to life.",
};

export const viewport = {
    themeColor: "#121212",
};

export default function Layout({ children }) {
    return (
        <html lang="fr">
            <body className={satoshi.className}>
                <Overlay />
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
