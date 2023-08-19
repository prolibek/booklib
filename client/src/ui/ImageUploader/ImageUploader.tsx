import React from "react";

import styles from "./ImageUploader.module.css";

interface ImageUploaderProps {
    text?: string;
    style?: object;
    change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

const ImageUploader:React.FC<ImageUploaderProps> = ({
    text, style, change, children
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (change) {
            change(e); 
        }
    };

    return (
        <div style={style}className={styles.imageInput}>
            {children}
            <input
                accept="image/*"
                onChange={handleChange}
                type="file"
            />
        </div>
    )
}

export default ImageUploader;