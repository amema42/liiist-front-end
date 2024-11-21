// components/ui/tag-input.tsx
import React, { useState } from "react";
import styles from "./TagInput.module.css";

interface TagInputProps {
    placeholder: string;
    onAdd: (tag: { name: string; quantity: number }) => void;
    onRemove: (index: number) => void;
    onIncreaseQuantity: (index: number) => void;
    onDecreaseQuantity: (index: number) => void;
    tags: { name: string; quantity: number }[];
}

export const TagInput: React.FC<TagInputProps> = ({
    placeholder,
    onAdd,
    onRemove,
    onIncreaseQuantity,
    onDecreaseQuantity,
    tags,
}) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            onAdd({ name: inputValue.trim(), quantity: 1 });
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
                className={styles.input}
            />
            <div className={styles.tagsContainer}>
                {tags.length > 0 ? (
                    tags.map((tag, index) => (
                        <div key={index} className={styles.tag}>
                            <span className={styles.tagName}>{tag.name}</span>
                            <div className={styles.quantityControls}>
                                {tag.quantity > 1 ? (
                                    <button
                                        onClick={() =>
                                            onDecreaseQuantity(index)
                                        }
                                        className={styles.quantityButton}
                                    >
                                        -
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onRemove(index)}
                                        className={styles.removeButton}
                                    >
                                        x
                                    </button>
                                )}
                                <span className={styles.quantityCircle}>
                                    {tag.quantity}
                                </span>
                                <button
                                    onClick={() => onIncreaseQuantity(index)}
                                    className={styles.quantityButton}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.noTags}>No tags added yet.</p>
                )}
            </div>
        </div>
    );
};
