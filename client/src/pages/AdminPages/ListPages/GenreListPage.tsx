import Layout from "~/components/Layout/Layout";
import { useState, useEffect } from "react";
import styles from "./GenreListPage.module.css";
import TextInput from "~/ui/TextInput/TextInput";
import { Link } from "react-router-dom";
import GenreCard from "~/components/GenreCard/GenreCard";
import $api from "~/http";

const GenreListPage = () => {

    const [genreList, setGenreList] = useState([]);
    const [genreCount, setGenreCount] = useState(0);

    useEffect(() => {
        (async () => {
            const response = await $api.get("library/genres/");
            setGenreList([...genreList, ...response.data]);
        })();
    }, [])

    const getEnding: string = (count: number) => {
        switch(count % 10) {
            case 1:
                return "";
            case 2:
            case 3:
            case 4:
                return "а";
            default:
                return "ов"; 
        }
    }

    return (
        <Layout>
            <div className={styles.wrapper}>
                <div className={[styles.flexer, styles.head].join(' ')}>
                    <div className={[styles.flexer, styles.textAndInput].join(' ')}>
                        <div>
                            <h2 className={styles.mainText}>Жанры</h2>
                            <p className={styles.smallText}>{genreCount} жанр{getEnding(genreCount)}</p>
                        </div>
                        <TextInput 
                            text="Имя жанра"
                            style={{
                                width: "230px",
                                height: "30px",
                                fontSize: "14px"
                            }}
                        />
                    </div>
                    <Link 
                        className={styles.link}
                        to="/admin/genres/genre-add">Добавить жанр</Link>
                </div>
                <div>
                    {genreList.map((item) => (
                            <GenreCard name={item.name} description={item.description}/>
                        ))}
                </div>
            </div>
        </Layout>
    )
}

export default GenreListPage;