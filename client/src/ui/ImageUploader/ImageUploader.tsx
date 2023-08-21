import React, { useState } from "react";

import styles from "./ImageUploader.module.css";

import BasicModal from "../BasicModal/BasicModal";
import Button from "../Button/Button";

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageUploaderProps {
    style?: object;
    src: string;
    setOutput: unknown;
    output: unknown;
    setImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    change: (e: React.ChangeEvent<HTMLInputElement>) => void;
    visible?: boolean;
    setVisible?: () => boolean;
    children?: React.ReactNode;
    crop: unknown;
    setCrop: unknown;
    image: unknown;
}

const ImageUploader:React.FC<ImageUploaderProps> = ({
    style, change, src, setImage, visible, setVisible, crop, setCrop, image, setOutput, output, children
}) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (change) {
            change(e); 
        }
    };

    const cropImageNow = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
 
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';
 
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
 
        // Converting to base64
        const base64Image = canvas.toDataURL('image/jpeg');
        setOutput(base64Image);
        setVisible(false);
    };

    return (
        <div style={style} className={styles.imageInput}>
            {
                output ?
                (
                <img 
                    src={output}
                />
                )
                :
                <>{children}</>
            }
            <input
                accept="image/*"
                onChange={handleChange}
                type="file"
            />
            <BasicModal
                visible={visible}
                setVisible={setVisible}
            >
                {src && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            alignItems: "center"
                        }}
                    >
                        <ReactCrop
                            crop={crop}
                            onChange={setCrop}
                            aspect={17/21}
                        >
                            <img
                                style={{
                                    maxWidth: "1000px",
                                    maxHeight: "600px"
                                }}
                               src={src}
                               onLoad={setImage}
                            />
                        </ReactCrop>
                        <Button
                            width="400px"
                            height="35px"
                            fontSize="18px"
                            click={() => cropImageNow()}
                        >Обрезать</Button>
                    </div>
                )}
            </BasicModal>
        </div>
    )
}

export default ImageUploader;