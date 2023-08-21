import React from "react";

import styles from './Button.module.css';

interface ButtonProps {
    click?: () => void;
    width?: string;
    height?: string;
    fontSize?: string;
    style?: object;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = 
    ({
        click,
        width,
        height,
        fontSize,
        style,
        children
    }) => {

        return (
            <button onClick={click} style={{width, height, color: "#4D2900", fontSize, ...style}} className={styles.button}>
                {children}
            </button>
        )
}

export default Button;