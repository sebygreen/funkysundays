import parse from "html-react-parser";

async function retrieveEmbed(platform, url) {
    if (platform == "soundcloud") {
        const res = await fetch(`https://soundcloud.com/oembed?url=${url}`);
        const embed = await res.json();
        return embed;
    } else if (platform == "spotify") {
        const res = await fetch(`https://open.spotify.com/oembed?url=${url}`);
        const embed = await res.json();
        return embed;
    }
}

export default async function Embed({ platform, url }) {
    const embed = await retrieveEmbed(platform, url);
    return parse(embed.html);
}
