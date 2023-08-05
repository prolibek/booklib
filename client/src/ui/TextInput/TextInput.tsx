import React from 'react';

import styles from './TextInput.module.css';

interface SearchBoxProps {
    width?: string;
    height?: string;
    fontSize?: string;
    text?: string;
    children?: React.ReactNode;
}

const TextInput: React.FC<SearchBoxProps> = 
    ({
        width, 
        height, 
        fontSize, 
        text
    }) => {
    return (
        <input
            placeholder={text}
            style={{width, height, fontSize}}
            className={styles.input}
        />
    );
};

export default TextInput;