import { CountdownBase } from "@/types";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import fr from "dayjs/locale/fr";
import utc from "dayjs/plugin/utc";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.locale(fr);
export const djs = dayjs;

export const dateDifference = (date: string, offset?: boolean): CountdownBase => {
    const diff = offset
        ? dayjs(date).subtract(2, "seconds").diff(dayjs().utc(true)) / 1000
        : dayjs(date).diff(dayjs().utc(true)) / 1000;
    let d = Math.floor(diff / (60 * 60 * 24));
    let h = Math.floor((diff - d * 60 * 60 * 24) / (60 * 60));
    let m = Math.floor((diff - (d * 60 * 60 * 24 + h * 60 * 60)) / 60);
    let s = Math.floor(diff - (d * 60 * 60 * 24 + h * 60 * 60 + m * 60));
    return { d: d, h: h, m: m, s: s };
};

export const createImage = (
    data: { filename: string; collection: string; id: string },
    options?: {
        size?: boolean;
        thumbnail?: string;
    },
) => {
    const url =
        options && options.thumbnail
            ? `${process.env.POCKETBASE_URL}/api/files/${data.collection}/${data.id}/${data.filename}?thumb=${options.thumbnail}`
            : `${process.env.POCKETBASE_URL}/api/files/${data.collection}/${data.id}/${data.filename}`;
    if (options && options.size) {
        const regex = /.+_([0-9]+)x([0-9]+)_.+/g;
        const match = [...data.filename.matchAll(regex)][0];
        return {
            url: url,
            width: Number(match[1]),
            height: Number(match[2]),
        };
    } else {
        return {
            url: url,
            width: null,
            height: null,
        };
    }
};

export const scaleLogo = (height: number, width: number) => {
    const base = 64;
    const scale = 0.6;
    const ratio = width / height;
    return {
        width: Math.round(Math.pow(ratio, scale) * base),
        height: Math.round((Math.pow(ratio, scale) * base) / ratio),
    };
};
