import { Button, Container, Font, Head, Heading, Html, Text } from "@react-email/components";
import parse from "html-react-parser";

interface Props {
    subject: string;
    name: string;
    email: string;
    message: string;
}

const subjects: { [key: string]: string } = {
    member: "Je souhaite devenir membre.",
    volunteer: "Je souhaite me porter volontaire.",
    artist: "Je souhaite jouer sur scène.",
    question: "J'ai une question.",
    privacy: "Appliquer mes droits à l'image.",
    feedback: "Je souhaite faire une remarque.",
    other: "Autre chose.",
};

export default function EmailContact({ ...props }: Props) {
    const message = props.message.replace(/\n/g, "<br />");
    return (
        <Html lang="en">
            <Head>
                <Font
                    fontFamily="Satoshi"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: "https://fonts.cdnfonts.com/css/satoshi",
                        format: "truetype",
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Container>
                <Heading
                    style={{
                        margin: "0 0 30px 0",
                    }}
                    as="h1"
                >
                    New Form Submission
                </Heading>
                <Text
                    style={{
                        margin: "0 0 15px 0",
                        fontSize: "16px",
                        lineHeight: "20px",
                    }}
                >
                    Subject: {subjects[props.subject]}
                </Text>
                <Text style={{ margin: "0 0 15px 0", fontSize: "16px", lineHeight: "20px" }}>Name: {props.name}</Text>
                <Text style={{ margin: "0 0 15px 0", fontSize: "16px", lineHeight: "20px" }}>Email: {props.email}</Text>
                <Text style={{ margin: "0 0 5px 0", fontSize: "16px", lineHeight: "20px" }}>Message:</Text>
                <Text
                    style={{
                        margin: "0 0 30px 0",
                        fontSize: "16px",
                        lineHeight: "20px",
                        padding: "12px",
                        boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.1)",
                        borderRadius: "10px",
                    }}
                >
                    {parse(message)}
                </Text>
                <Button
                    style={{
                        margin: 0,
                        padding: "8px 12px",
                        borderRadius: "50px",
                        fontSize: "16px",
                        backgroundColor: "rgb(25, 25, 25)",
                        color: "white",
                    }}
                    href={`mailto:${props.email}?subject=Re: ${subjects[props.subject]}`}
                >
                    Respond to {props.email}
                </Button>
            </Container>
        </Html>
    );
}
