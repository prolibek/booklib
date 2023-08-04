import React from 'react';

import styles from './StronglyRoundedInput.module.css';

interface SearchBoxProps {
    width?: string;
    height?: string;
    fontSize?: string;
    text?: string;
}

const StronglyRoundedInput: React.FC<SearchBoxProps> = 
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

export default StronglyRoundedInput;