import Contact from "@/components/client/Contact";

export const metadata = {
    title: "Contact",
};

export default function Page() {
    return (
        <div className="constrain">
            <h1>Contactez-nous</h1>
            <Contact />
        </div>
    );
}