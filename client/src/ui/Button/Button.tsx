import React from "react";

import styles from './Button.module.css';

interface ButtonProps {
    click?: () => void;
    width?: string;
    height?: string;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = 
    ({
        click,
        width,
        height,
        children
    }) => {
        return (
            <button onClick={click} style={{width, height}} className={styles.button}>
                {children}
            </button>
        )
}

export default Button;