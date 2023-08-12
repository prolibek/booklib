import React, { useState, useRef, useEffect } from "react";
import styles from "./TextArea.module.css";

interface TextAreaProps {
    value?: string;
    handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    style?: React.CSSProperties;
    text: string;
}

const TextArea: React.FC<TextAreaProps> = ({
    style,
    text,
    value,
    handleChange
}) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            const newHeight = textareaRef.current.scrollHeight;
            setHeight(newHeight);
            textareaRef.current.style.height = `${newHeight}px`;
        }
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            onChange={handleChange}
            value={value}
            className={styles.textArea}
            placeholder={text}
            style={{ ...style, height: `${height}px` }}
        />
    );
};

export default TextArea;