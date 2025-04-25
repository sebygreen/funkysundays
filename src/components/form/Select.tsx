import styles from "@/style/form/Input.module.css";
import { CaretUpDown } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import Label from "./Label";
import { ChangeEvent } from "react";

interface SelectProps {
    name: string;
    label: string;
    options: {
        value: string;
        label: string;
    }[];
    error?: string | null;
    className?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ ...props }: SelectProps) {
    return (
        <div className={clsx(styles.group, props.className && props.className, props.error && styles.error)}>
            <Label name={props.name} label={props.label} error={props.error} />
            <div className={styles.select}>
                <CaretUpDown />
                <select name={props.name} id={props.name} onChange={props.onChange}>
                    {props.options.map((i, n) => (
                        <option key={n} value={i.value}>
                            {i.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
