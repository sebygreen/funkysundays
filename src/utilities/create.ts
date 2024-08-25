import { djs, filenameLink, filenameSize } from "@/utilities/tools";
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
import { v4 as uuidv4 } from "uuid";

export const createEventUpcoming = (data: any): EventUpcoming => {
    return {
        id: data.id,
        collectionId: data.collectionId,
        name: data.name,
        start: data.start,
        category: data.category,
        artwork: data.artwork ? filenameLink(data.artwork, data.collectionId, data.id) : undefined,
    };
};

export const createEventBase = (data: any, artist: boolean): EventBase => {
    return {
        id: artist ? data.expand.event.id : data.id,
        name: artist ? data.expand.event.name : data.name,
        start: data.start,
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
        poster: data.poster ? filenameLink(data.poster, data.collectionId, data.id) : undefined,
        partners:
            data.expand && data.expand.partners ? data.expand.partners.map((i: any) => createPartner(i)) : undefined,
        sponsors:
            data.expand && data.expand.sponsors ? data.expand.sponsors.map((i: any) => createPartner(i)) : undefined,
        schedule:
            data.expand && data.expand["schedule(event)"] ?
                data.expand["schedule(event)"].map((i: any) => createSet(i))
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
        logo: filenameSize(data.logo, data.collectionId, data.id),
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
        picture: data.picture ? filenameLink(data.picture, data.collectionId, data.id) : undefined,
    };
};

export const createArtistExpanded = (data: any): ArtistExpanded => {
    return {
        id: data.id,
        collectionId: data.collectionId,
        name: data.name,
        type: data.type,
        picture: data.picture ? filenameLink(data.picture, data.collectionId, data.id) : undefined,
        description: data.description ? data.description : undefined,
        socials: data.expand.links.filter((i: any) => !i.embed).map((i: any) => createLink(i)),
        embeds: data.expand.links.filter((i: any) => i.embed).map((i: any) => createLink(i)),
        upcoming: data.upcoming.length > 0 ? data.upcoming.map((i: any) => createEventBase(i, true)) : undefined,
    };
};

export const createLink = (data: any): LinkBase => {
    return {
        id: data.id,
        url: data.url,
        embed: data.embed,
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
        picture: data.picture ? filenameLink(data.picture, data.collectionId, data.id) : undefined,
    };
};

export const createToast = (type: "error" | "success" | "warning", message: string) => {
    return {
        id: uuidv4(),
        type: type,
        message: message,
        expired: false,
    };
};
