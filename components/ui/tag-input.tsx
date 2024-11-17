import React, { useState } from "react";

interface TagInputProps {
    placeholder: string;
    onAdd: (tag: string) => void;
    onRemove: (index: number) => void;
    tags?: string[];
}

export const TagInput = ({
    placeholder,
    onAdd,
    onRemove,
    tags = [], // Default value: se `tags` non è fornito, usa un array vuoto
}: TagInputProps) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            onAdd(inputValue.trim());
            setInputValue("");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
            />
            <div>
                {tags.length > 0 ? (
                    tags.map((tag, index) => (
                        <span
                            key={index}
                            style={{
                                margin: "5px",
                                padding: "5px",
                                backgroundColor: "#f0f0f0",
                            }}
                        >
                            {tag}
                            <button
                                onClick={() => onRemove(index)}
                                style={{ marginLeft: "5px" }}
                            >
                                x
                            </button>
                        </span>
                    ))
                ) : (
                    <p>No tags added yet.</p>
                )}
            </div>
        </div>
    );
};
