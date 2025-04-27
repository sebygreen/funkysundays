import GeoPoint = types.GeoPoint;

export interface ImageBase {
    url: string;
    width: number | null;
    height: number | null;
}

export interface EventUpcoming {
    id: string;
    collectionId: string;
    name: string;
    start: string;
    end: string;
    started: boolean;
    ended: boolean;
    category: "Funky Sunday";
    artwork?: ImageBase;
}

export interface EventBase {
    id: string;
    name: string;
    start: string;
    end: string;
    started: boolean;
    ended: boolean;
    category: "Funky Sunday" | "Promotion";
    activity?: "Blind Test" | "Karaoke";
}

export interface EventExpanded {
    id: string;
    name: string;
    category: "Funky Sunday" | "Promotion";
    activity?: "Blind Test" | "Karaoke";
    start: string;
    end: string;
    started: boolean;
    ended: boolean;
    days: boolean;
    location?: GeoPoint;
    attendees?: number;
    poster?: ImageBase;
    sponsors?: PartnerBase[];
    schedule?: SetBase[];
}

export interface AlertBase {
    id: string;
    title: string;
    type?: "crowdfunding" | "volunteers";
    description: string;
    link: string;
}

export interface StatisticsBase {
    attendees: number;
    events: number;
    artists: number;
    sponsors: number;
    staff: number;
}

export interface CountdownBase {
    d: number;
    h: number;
    m: number;
    s: number;
}

export interface PartnerBase {
    id: string;
    name: string;
    logo: ImageBase;
    url?: string;
}

export interface SetBase {
    id: string;
    start: string;
    end: string;
    started: boolean;
    ended: boolean;
    day: string;
    artist: {
        id: string;
        name: string;
    };
}

export interface ArtistBase {
    id: string;
    collectionId: string;
    name: string;
    type: "DJ" | "Groupe";
    sort: "Regular" | "2024" | "2025" | "2026" | "2027";
    picture?: ImageBase;
}

export interface ArtistExpanded {
    id: string;
    collectionId: string;
    name: string;
    type: "DJ" | "Groupe";
    sort: "Regular" | "2024" | "2025" | "2026" | "2027";
    description?: string;
    picture?: ImageBase;
    socials: LinkBase[];
    embeds: EmbedBase[];
    upcoming?: EventBase[];
}

export interface LinkBase {
    id: string;
    url: string;
    platform: "instagram" | "facebook";
    username: string;
}

export interface EmbedBase {
    id: string;
    html: string;
    platform: "spotify" | "soundcloud";
    username: string;
}

export interface StaffBase {
    id: string;
    name: string;
    status: "Comité" | "Membre" | "Externe";
    role: "Communication" | "Partenariats" | "Musique" | "Légal" | "Finances" | "Logistique";
    position?: string[];
    picture?: ImageBase;
}
