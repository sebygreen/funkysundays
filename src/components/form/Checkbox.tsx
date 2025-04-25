import styles from "@/style/form/Input.module.css";
import { clsx } from "clsx";
import { ChangeEvent } from "react";

interface CheckboxProps {
    name: string;
    label: string;
    checked?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export default function Checkbox({ ...props }: CheckboxProps) {
    return (
        <div className={clsx(styles.checkbox, props.className && props.className)}>
            <label className={styles.switch} htmlFor={props.name}>
                <input
                    type="checkbox"
                    id={props.name}
                    name={props.name}
                    checked={props.checked}
                    onChange={props.onChange}
                />
                <span className={styles.slider} />
            </label>
            <label htmlFor={props.name}>{props.label}</label>
        </div>
    );
}
