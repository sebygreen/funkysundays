import { CountdownBase } from "@/types";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import fr from "dayjs/locale/fr";
import utc from "dayjs/plugin/utc";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.locale(fr);

export const dateDifference = (date: string, offset?: boolean): CountdownBase => {
    const diff = offset ? dayjs(date).subtract(2, "seconds").diff(dayjs()) / 1000 : dayjs(date).diff(dayjs()) / 1000;
    let d = Math.floor(diff / (60 * 60 * 24));
    let h = Math.floor((diff - d * 60 * 60 * 24) / (60 * 60));
    let m = Math.floor((diff - (d * 60 * 60 * 24 + h * 60 * 60)) / 60);
    let s = Math.floor(diff - (d * 60 * 60 * 24 + h * 60 * 60 + m * 60));
    return { d: d, h: h, m: m, s: s };
};

export const filenameSize = (filename: any, collection: string, id: string) => {
    let regex = /.+_([0-9]+)x([0-9]+)_.+/g;
    let match = [...filename.matchAll(regex)][0];
    return {
        image: filenameLink(filename, collection, id),
        height: Number(match[1]),
        width: Number(match[2]),
    };
};

export const filenameLink = (filename: any, collection: string, id: string) => {
    return `${process.env.POCKETBASE_URL}/api/files/${collection}/${id}/${filename}`;
};

export const djs = dayjs;
