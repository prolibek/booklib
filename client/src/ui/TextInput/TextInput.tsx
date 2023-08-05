import React from 'react';

import styles from './TextInput.module.css';

interface SearchBoxProps {
    width?: string;
    height?: string;
    fontSize?: string;
    text?: string;
    borderRadius?: string;
    children?: React.ReactNode;
}

const TextInput: React.FC<SearchBoxProps> = 
    ({
        width, 
        height, 
        fontSize, 
        text,
        borderRadius
    }) => {
    return (
        <input
            placeholder={text}
            style={{width, height, fontSize, borderRadius}}
            className={styles.input}
        />
    );
};

export default TextInput;