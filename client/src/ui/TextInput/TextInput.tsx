import React from 'react';

import styles from './TextInput.module.css';

interface SearchBoxProps {
    style?: object;
    children?: React.ReactNode;
    text?: string;
    value?: string;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<SearchBoxProps> = 
    ({
        style, 
        text,
        value,
        handleChange
    }) => {
    return (
        <input
            onChange={handleChange}
            value={value}
            placeholder={text}
            style={style}
            className={styles.input}
        />
    );
};

export default TextInput;