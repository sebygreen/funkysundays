import { createImage, djs } from "@/utilities/tools";
import {
    AlertBase,
    ArtistBase,
    ArtistExpanded,
    EmbedBase,
    EventBase,
    EventExpanded,
    EventUpcoming,
    LinkBase,
    PartnerBase,
    SetBase,
    StaffBase,
} from "@/types";
import { v4 } from "uuid";

const now = djs().utc(true);

export const createEventUpcoming = (data: any): EventUpcoming => {
    return {
        id: data.id,
        collectionId: data.collectionId,
        name: data.name,
        start: data.start,
        end: data.end,
        started: djs(data.start).isBefore(now),
        ended: djs(data.end).isBefore(now),
        category: data.category,
        artwork:
            data.artwork ?
                createImage({
                    filename: data.artwork,
                    collection: data.collectionId,
                    id: data.id,
                })
            :   undefined,
    };
};

export const createEventBase = (data: any, artist: boolean): EventBase => {
    return {
        id: artist ? data.expand.event.id : data.id,
        name: artist ? data.expand.event.name : data.name,
        start: artist ? data.expand.event.start : data.start,
        end: artist ? data.expand.event.end : data.end,
        started: djs(data.start).isBefore(now),
        ended: djs(data.end).isBefore(now),
        category: artist ? data.expand.event.category : data.category,
        activity: artist ? data.expand.event.activity || undefined : data.activity || undefined,
    };
};

export const createEventExpanded = (event: any, schedule: any): EventExpanded => {
    return {
        id: event.id,
        name: event.name,
        category: event.category,
        activity: event.activity ? event.activity : undefined,
        start: event.start,
        end: event.end,
        started: djs(event.start).isBefore(now),
        ended: djs(event.end).isBefore(now),
        days: djs(event.end).isAfter(djs(event.start), "day"),
        location: event.location.lon != 0 && event.location.lat != 0 ? event.location : undefined,
        attendees: event.attendees > 0 ? event.attendees : undefined,
        poster:
            event.poster ?
                createImage(
                    {
                        filename: event.poster,
                        collection: event.collectionId,
                        id: event.id,
                    },
                    { thumbnail: "512x512" },
                )
            :   undefined,
        sponsors:
            event.expand && event.expand.sponsors ? event.expand.sponsors.map((i: any) => createPartner(i)) : undefined,
        schedule: !!schedule.length ? schedule.map((i: any) => createSet(i)) : undefined,
    };
};

export const createAlert = (data: any): AlertBase => {
    return {
        id: data.id,
        title: data.title,
        type: data.type ? data.type : undefined,
        description: data.description,
        link: data.link,
    };
};

export const createPartner = (data: any): PartnerBase => {
    return {
        id: data.id,
        name: data.name,
        logo: createImage(
            {
                filename: data.logo,
                collection: data.collectionId,
                id: data.id,
            },
            { size: true },
        ),
        url: data.url ? data.url : undefined,
    };
};

export const createSet = (data: any): SetBase => {
    return {
        id: data.id,
        start: data.start,
        end: data.end,
        started: djs.utc(data.start).isBefore(now),
        ended: djs.utc(data.end).isBefore(now),
        day: djs(data.start).format("YYYY-MM-DD"),
        artist: {
            id: data.expand.artist.id,
            name: data.expand.artist.name,
        },
    };
};

export const createArtistBase = (data: any): ArtistBase => {
    return {
        id: data.id,
        collectionId: data.collectionId,
        name: data.name,
        type: data.type,
        sort: data.sort,
        picture:
            data.picture ?
                createImage(
                    {
                        filename: data.picture,
                        collection: data.collectionId,
                        id: data.id,
                    },
                    { thumbnail: "256x256" },
                )
            :   undefined,
    };
};

export const createArtistExpanded = (data: any): ArtistExpanded => {
    return {
        id: data.id,
        collectionId: data.collectionId,
        name: data.name,
        type: data.type,
        sort: data.sort,
        picture:
            data.picture ?
                createImage(
                    {
                        filename: data.picture,
                        collection: data.collectionId,
                        id: data.id,
                    },
                    { thumbnail: "512x512" },
                )
            :   undefined,
        description: data.description ? data.description : undefined,
        socials: data.expand.links.filter((i: any) => !i.embed).map((i: any) => createLink(i)),
        embeds: data.embeds.map((i: any) => createEmbed(i)),
        upcoming: data.upcoming.length > 0 ? data.upcoming.map((i: any) => createEventBase(i, true)) : undefined,
    };
};

export const createLink = (data: any): LinkBase => {
    return {
        id: data.id,
        url: data.url,
        platform: data.platform,
        username: data.username,
    };
};

export const createEmbed = (data: any): EmbedBase => {
    return {
        id: data.id,
        html: data.html,
        platform: data.platform,
        username: data.username,
    };
};

export const createStaff = (data: any): StaffBase => {
    return {
        id: data.id,
        name: data.name,
        position: data.position ? data.position.split(", ") : undefined,
        picture:
            data.picture ?
                createImage(
                    {
                        filename: data.picture,
                        collection: data.collectionId,
                        id: data.id,
                    },
                    { thumbnail: "256x256" },
                )
            :   undefined,
    };
};

export const createToast = (type: "error" | "success" | "warning", message: string) => {
    return {
        id: v4(),
        type: type,
        message: message,
        expired: false,
    };
};
