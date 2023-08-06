import React from 'react';

import styles from './TextInput.module.css';

interface SearchBoxProps {
    width?: string;
    height?: string;
    fontSize?: string;
    text?: string;
    borderRadius?: string;
    children?: React.ReactNode;
    value?: string;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<SearchBoxProps> = 
    ({
        width, 
        height, 
        fontSize, 
        text,
        borderRadius,
        value,
        handleChange
    }) => {
    return (
        <input
            onChange={handleChange}
            value={value}
            placeholder={text}
            style={{width, height, fontSize, borderRadius}}
            className={styles.input}
        />
    );
};

export default TextInput;