import React, { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
    children: ReactNode;
    onClick: () => void;
    className?: string;
    [key: string]: unknown /*unknown instead of any */;
};

export const Button = ({
    children,
    onClick,
    className = "",
    ...props
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
