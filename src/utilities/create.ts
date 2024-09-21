import { createImage, djs } from "@/utilities/tools";
import {
    AlertBase,
    ArtistBase,
    ArtistExpanded,
    EventBase,
    EventExpanded,
    EventUpcoming,
    LinkBase,
    PartnerBase,
    SetBase,
    StaffBase,
} from "@/types";
import { v4 } from "uuid";
import { fetchEmbed } from "@/utilities/fetch";

export const createEventUpcoming = (data: any): EventUpcoming => {
    return {
        id: data.id,
        collectionId: data.collectionId,
        name: data.name,
        start: data.start,
        end: data.end,
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
        start: data.start,
        end: data.end,
        category: artist ? data.expand.event.category : data.category,
        activity:
            artist ?
                data.expand.event.activity ?
                    data.expand.event.activity
                :   undefined
            : data.activity ? data.activity
            : undefined,
    };
};

export const createEventExpanded = (data: any): EventExpanded => {
    return {
        id: data.id,
        name: data.name,
        category: data.category,
        activity: data.activity ? data.activity : undefined,
        start: data.start,
        end: data.end,
        archive: djs(data.start).isBefore(djs()),
        days: djs(data.end).isAfter(djs(data.start), "day"),
        location: data.location ? data.location : undefined,
        attendees: data.attendees > 0 ? data.attendees : undefined,
        poster:
            data.poster ?
                createImage(
                    {
                        filename: data.poster,
                        collection: data.collectionId,
                        id: data.id,
                    },
                    { thumbnail: "512x512" },
                )
            :   undefined,
        sponsors:
            data.expand && data.expand.sponsors ? data.expand.sponsors.map((i: any) => createPartner(i)) : undefined,
        schedule:
            data.expand && data.expand.schedule_via_event ?
                data.expand.schedule_via_event.map((i: any) => createSet(i))
            :   undefined,
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
        embeds: data.embeds,
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

export const createEmbed = async (data: any) => {
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
        status: data.status,
        role: data.role,
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
