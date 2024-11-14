// components/ui/input.tsx

import React from "react";

interface InputProps {
    type?: string;
    placeholder: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    suffix?: string;
}

export const Input = ({ type = "text", placeholder, value, onChange, suffix }: InputProps) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{ padding: "10px", flex: 1 }}
            />
            {suffix && <span>{suffix}</span>}
        </div>
    );
};
