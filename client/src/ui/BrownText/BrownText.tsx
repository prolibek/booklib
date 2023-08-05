import React from "react";
import styles from "./BrownText.module.css";

interface BrownTextProps {
    fontSize?: string;
    children?: React.ReactNode;
}

console.log(styles)

const BrownText: React.FC<BrownTextProps> =
    ({
        fontSize, 
        children
    }) => {
    return (
        <p style={{fontSize}} className={styles.brownText}>
            {children}
        </p>
    );
};

export default BrownText;