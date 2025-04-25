import styles from "@/style/form/Input.module.css";
import clsx from "clsx";
import Label from "./Label";
import { ChangeEvent } from "react";

interface InputProps {
    type: "text" | "password" | "number";
    name: string;
    label: string;
    placeholder: string;
    error?: string | null;
    className?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ ...props }: InputProps) {
    return (
        <div className={clsx(styles.group, props.className && props.className, props.error && styles.error)}>
            <Label name={props.name} label={props.label} error={props.error} />
            <input
                type={props.type}
                name={props.name}
                id={props.name}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </div>
    );
}
