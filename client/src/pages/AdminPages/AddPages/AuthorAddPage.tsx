import { useState } from "react";

import TextInput from "~/ui/TextInput/TextInput";
import TextArea from "~/ui/TextArea/TextArea";
import Button from "~/ui/Button/Button";
import Layout from "~/components/Layout/Layout";

import styles from "./GenreAddPage.module.css";
import $api from "~/http";
import { useNavigate } from "react-router-dom";
import ImageUploader from "~/ui/ImageUploader/ImageUploader";

const AuthorAddPage = () => {

    const nav = useNavigate();

    const inputStyle = {
        width: "100%",
        height: "50px",
        fontSize: "16px"
    }

    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16/21 })
    const [image, setImage] = useState(null);
    const [output, setOutput] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [desc, setDesc] = useState("");
    const [slug, setSlug] = useState("");

    const selectImage = (file: Blob) => {
        setImage(null);
        setSrc(null);
        setOutput(null);
        setCrop({ aspect: 16/21 });
        const imgUrl = URL.createObjectURL(file);
        setSrc(imgUrl);
        setVisible(true);
    }

    const handlePost = async () => {
        try {
            await $api.post("library/authors/", {
                first_name: firstName,
                last_name: lastName,
                portrait: output,
                biography: desc,
                slug
            });
            nav("admin/authors", { replace: false });
        } catch(error) {
            console.log(error);
        }
    }

    const [visible, setVisible] = useState(false);

    // 16*21
    return (
        <Layout>
            <div className={styles.wrapper}>
                <h2 className={styles.mainText}>Добавление автора</h2>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
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
                            width: "calc(28% - 27px)",
                            height: "340px",
                            marginRight: "27px"
                        }}
                        change={(e: React.ChangeEvent<HTMLInputElement>) => selectImage(e.target.files[0])}
                    >
                        <img 
                            src={output} 
                            style={{
                                width: "110%",
                                height: "calc(100% + 8px)",
                                borderRadius: "20px"
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
                        src={src}
                        setImage={(e) => setImage(e.target)}
                        crop={crop}
                        setCrop={setCrop}
                        image={image}
                        visible={visible}
                        setVisible={setVisible}
                        setOutput={setOutput}
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
                                    value={firstName}
                                    handleChange={(e) => setFirstName(e.target.value)}
                                    style={inputStyle} 
                                    text="Имя автора"
                                />
                                <TextInput
                                    value={lastName}
                                    handleChange={(e) => setLastName(e.target.value)}
                                    style={inputStyle}  
                                    text="Фамилия автора (необязательно)"
                                />
                            </div>
                            <div style={{
                                width: "50%"
                            }}>
                                <TextInput
                                    value={slug}
                                    handleChange={(e) => setSlug(e.target.value)}
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
                                value={desc}
                                handleChange={(e) => setDesc(e.target.value)}
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
        </Layout>
    )
};

export default AuthorAddPage;