import localFont from "next/font/local";

const satoshi = localFont({
    src: [
        {
            path: "../fonts/Satoshi[wght].ttf",
            display: "swap",
            style: "normal",
            weight: "100 900",
        },
        {
            path: "../fonts/Satoshi-Italic[wght].ttf",
            display: "swap",
            style: "italic",
            weight: "100 900",
        },
    ],
});

const jetBrainsMono = localFont({
    src: [
        {
            path: "../fonts/JetBrainsMono[wght].ttf",
            display: "swap",
            style: "normal",
            weight: "400 900",
        },
        {
            path: "../fonts/JetBrainsMono-Italic[wght].ttf",
            display: "swap",
            style: "italic",
            weight: "400 900",
        },
    ],
});

export { satoshi, jetBrainsMono };
