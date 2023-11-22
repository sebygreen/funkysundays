import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Overlay from "@/components/client/Overlay";
import { satoshi } from "@/lib/fonts";
import "./globals.css";

export const metadata = {
    title: "Funky Sundays",
    description: "Making sundays a better day since 2019.",
};

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body className={satoshi.className}>
                <Overlay />
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
