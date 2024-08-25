import localFont from "next/font/local";

const Satoshi = localFont({
    src: [
        {
            path: "../fonts/Satoshi/Regular[wght].ttf",
            style: "normal",
            weight: "300 900",
        },
        {
            path: "../fonts/Satoshi/Italic[wght].ttf",
            style: "italic",
            weight: "300 900",
        },
    ],
});

const Overpass = localFont({
    src: [
        {
            path: "../fonts/Overpass Mono/Regular[wght].ttf",
            style: "normal",
            weight: "300 700",
        },
    ],
});

export { Satoshi, Overpass };
