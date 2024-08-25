export interface EventBase {
    id: string;
    name: string;
    start: string;
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
    archive: boolean;
    days: boolean;
    location?: string;
    attendees?: number;
    poster?: string;
    partners?: PartnerBase[];
    sponsors?: PartnerBase[];
    schedule?: SetBase[];
}

export interface EventUpcoming {
    id: string;
    collectionId: string;
    name: string;
    start: string;
    category: "Funky Sunday";
    artwork?: string;
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
    logo: {
        image: string;
        height: number;
        width: number;
    };
    url?: string;
}

export interface SetBase {
    id: string;
    start: string;
    end: string;
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
    picture?: string;
}

export interface ArtistExpanded {
    id: string;
    collectionId: string;
    name: string;
    type: "DJ" | "Groupe";
    description?: string;
    picture?: string;
    socials: LinkBase[];
    embeds: LinkBase[];
    upcoming?: EventBase[];
}

export interface LinkBase {
    id: string;
    url: string;
    embed: boolean;
    platform: "instagram" | "facebook" | "snapchat" | "spotify" | "soundcloud";
    username: string;
}

export interface StaffBase {
    id: string;
    name: string;
    status: "Comité" | "Membre" | "Externe";
    role: "Communication" | "Partenariats" | "Musique" | "Légal" | "Finances" | "Logistique";
    position?: string[];
    picture?: string;
}
