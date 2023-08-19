import { useState, useEffect } from "react";

import TextInput from "~/ui/TextInput/TextInput";
import TextArea from "~/ui/TextArea/TextArea";
import Button from "~/ui/Button/Button";
import Layout from "~/components/Layout/Layout";

import styles from "./GenreAddPage.module.css";
import $api from "~/http";
import { useNavigate } from "react-router-dom";
import ImageUploader from "~/ui/ImageUploader/ImageUploader";
import BasicModal from "~/ui/BasicModal/BasicModal";

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const AuthorAddPage = () => {

    const inputStyle = {
        width: "100%",
        height: "50px",
        fontSize: "16px"
    }

    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16/21 })
    const [image, setImage] = useState(null);
    const [output, setOutput] = useState(null);

    const [visible, setVisible] = useState(false);

    const selectImage = (file: Blob) => {
        setImage(null);
        setSrc(null);
        setOutput(null);
        setCrop({ aspect: 16/21 });
        const imgUrl = URL.createObjectURL(file);
        setSrc(imgUrl);
        setVisible(true);
    }

    useEffect(() => {
        console.log(src);
    }, [src]);

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

    useEffect(() => {
        console.log(src);
    }, [src]);

    // 16*21
    return (
        <Layout>
            <div className={styles.wrapper}>
                <h2 className={styles.mainText}>Добавление автора</h2>
                <div
                    style={{
                        display: "flex",
                        marginBottom: "30px",
                        flexWrap: "wrap"
                    }}
                >
                    {
                    output ?
                    ( 
                    <ImageUploader
                        text="Нажмите или перетащите изображение автора"
                        style={{
                            width: "259px",
                            height: "340px",
                            marginRight: "27px"
                        }}
                        change={(e: React.ChangeEvent<HTMLInputElement>) => selectImage(e.target.files[0])}
                    >
                        <img 
                            src={output} 
                            style={{
                                height: "340px", 
                                marginRight: "27px",
                                borderRadius: "10px"
                            }}
                        /> 
                    </ImageUploader>)
                    :
                    <ImageUploader 
                        text="Нажмите или перетащите изображение автора"
                        style={{
                            width: "calc(28% - 27px)",
                            height: "340px",
                            marginRight: "27px"
                        }}
                        change={(e: React.ChangeEvent<HTMLInputElement>) => selectImage(e.target.files[0])}
                    >
                        <p>Нажмите или перетащите сюда фото автора</p>
                    </ImageUploader> 
                    }
                    <div className={styles.textValuesAuthor}>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row"
                            }}
                        >
                            <div
                                style={{
                                    width: "50%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "17px"
                                }}
                            >
                                <TextInput
                                    style={inputStyle} 
                                    text="Имя автора"
                                />
                                <TextInput
                                    style={inputStyle}  
                                    text="Фамилия автора (необязательно)"
                                />
                            </div>
                            <div style={{
                                width: "50%"
                            }}>
                                <TextInput
                                    style={{
                                        width: "calc(100% - 20px)",
                                        height: "117px",
                                        marginLeft: "20px",
                                        fontSize: "16px"
                                    }}  
                                    text="Название слага, например fyodor-dostoyevski"
                                />
                            </div>
                        </div>
                        <div style={{
                            width: "100%"
                        }}>
                            <TextArea 
                                style={{
                                    minHeight: "205px",
                                    fontSize: "16px",
                                    width: "100%",
                                    marginTop: "17px"
                                }}
                                text="Описание автора (автобиография, стилистика и т.д.)"
                            />
                        </div>
                    </div>
                </div>
                <Button
                    height="40px"
                    width="30%"
                    fontSize="16px"
                    style={{
                        marginLeft: "auto"
                    }}
                    click={ () => handlePost() }
                >Добавить автора</Button>
            </div>
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
                            aspect={18/21}
                        >
                            <img
                                style={{
                                    maxWidth: "1000px",
                                    maxHeight: "600px"
                                }}
                               src={src}
                               onLoad={(e) => setImage(e.target)}
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
        </Layout>
    )
};

export default AuthorAddPage;