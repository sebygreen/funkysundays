import Overlay from "@/components/client/Overlay";
import Footer from "@/components/server/footer";
import Header from "@/components/server/header";
import { satoshi } from "@/lib/localFonts";
import "./globals.css";

export const metadata = {
    title: "Funky Sundays",
    description: "Making sundays a better day since 2019.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={satoshi.className}>
                <Header />
                <main>{children}</main>
                <Overlay>
                    <Footer />
                </Overlay>
            </body>
        </html>
    );
}
