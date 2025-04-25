import "server-only";

export async function fetchPlace(query: string) {
    const options = new URLSearchParams({
        access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN!,
        country: "ch",
        language: "fr",
        limit: "1",
    }).toString();
    try {
        const data = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${options}`);
        const json = await data.json();
        return json.features[0];
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to fetch place from Mapbox.");
    }
}

export async function verifyCaptcha(token: string) {
    const res = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        { method: "POST" },
    );
    if (!res.ok) return false;
    const json = await res.json();
    return json.score >= 0.5;
}

export async function fetchEmbed(platform: "soundcloud" | "spotify", url: string) {
    if (platform === "spotify") {
        const res = await fetch(`https://open.spotify.com/oembed?url=${url}`);
        return await res.json();
    }
    if (platform === "soundcloud") {
        const res = await fetch(`https://soundcloud.com/oembed?url=${url}`);
        return await res.json();
    }
}
