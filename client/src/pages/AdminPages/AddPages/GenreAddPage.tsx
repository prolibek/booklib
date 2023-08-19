import { useState } from "react";

import TextInput from "~/ui/TextInput/TextInput";
import TextArea from "~/ui/TextArea/TextArea";
import Button from "~/ui/Button/Button";
import Layout from "~/components/Layout/Layout";

import styles from "./GenreAddPage.module.css";
import $api from "~/http";
import { useNavigate } from "react-router-dom";

const GenreAddPage = () => {

    const nav = useNavigate();

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [desc, setDesc] = useState("");
    
    const handlePost = async () => {
        try {
            await $api.post("library/genres/", {
                name: name,
                description: desc, 
                slug: slug
            });
            nav("/admin/genres", { replace: false });
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className={styles.wrapper}>
                <h2 className={styles.mainText}>Добавление жанра</h2>
                <div style={{width: "100%"}} className={styles.featuresText}>
                    <TextInput
                        text="Название жанра"
                        style={{
                            height: "50px",
                            width: "calc(60% - 12.5px)",
                            fontSize: "20px",
                            marginRight: "12.5px"
                        }}
                        value={name}
                        handleChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <TextInput
                        text="Название слага, например, epos"
                        style={{
                            height: "50px",
                            width: "calc(40% - 12.5px)",
                            fontSize: "20px",
                            marginLeft: "12.5px"
                        }}
                        value={slug}
                        handleChange={(e) => {
                            setSlug(e.target.value)
                        }}
                    />
                </div>
                <TextArea 
                    text="Описание жанра"
                    style={{
                        minHeight: "205px",
                        width: "100%",
                        fontSize: "20px",
                        marginTop: "22px",
                        marginBottom: "25px"
                    }}
                    value={desc}
                    handleChange={(e) => {
                        setDesc(e.target.value)
                    }}
                />
                <Button
                    height="40px"
                    width="30%"
                    fontSize="16px"
                    style={{
                        marginLeft: "auto"
                    }}
                    click={ () => handlePost() }
                >Добавить жанр</Button>
            </div>
        </Layout>
    )
};

export default GenreAddPage;