import React from "react";

import styles from "./BasicModal.module.css"

interface BasicModalProps {
    width?: string;
    height?: string;
    visible: boolean;
    setVisible: (name: boolean) => void;
    children?: React.ReactNode;
}

const BasicModal: React.FC<BasicModalProps> = 
    ({
        width, 
        height,
        visible, 
        setVisible, 
        children
    }) => {
    let rootStyles = [styles.Modal];

    if(visible) rootStyles.push(styles.active)
    
    return (
        <div 
            className={rootStyles.join(' ')}
            onClick={ () => { setVisible(false) } }
        >
            <div 
                style={{width, height}} 
                className={styles.ModalContent}
                onClick={ (e) => { e.stopPropagation() } }
            >
                <div 
                    className={styles.closeButton}
                    onClick={() => setVisible(false)}
                >
                    <span>&times;</span>
                </div>
                {children}
            </div>
        </div>    
    );
};

export default BasicModal;