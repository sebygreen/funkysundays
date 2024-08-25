import parse from "html-react-parser";

async function retrieveEmbed(platform: string, url: string) {
    if (platform === "soundcloud") {
        const res = await fetch(`https://soundcloud.com/oembed?url=${url}`);
        return await res.json();
    } else if (platform === "spotify") {
        const res = await fetch(`https://open.spotify.com/oembed?url=${url}`);
        return await res.json();
    }
}

export default async function Embed({ platform, url }: { platform: string; url: string }) {
    const embed = await retrieveEmbed(platform, url);
    return parse(embed.html);
}
