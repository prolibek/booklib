import Layout from "~/components/Layout/Layout";
import { useState, useEffect } from "react";
import styles from "./GenreListPage.module.css";
import TextInput from "~/ui/TextInput/TextInput";
import { Link } from "react-router-dom";
import $api from "~/http";
import AuthorItem from "~/components/AuthorItem/AuthorItem";

interface AuthorModel {
    id: number;
    first_name: string;
    last_name: string;
    portrait?: string;
    biography?: string;
}

const AuthorListPage = () => {

    const [authorList, setAuthorList] = useState([]);
    const [authorCount, setAuthorCount] = useState(0);

    useEffect(() => {
        (async () => {
            const response = await $api.get("library/authors/");
            console.log(response);
            setAuthorList([...response.data]);
        })();
    }, [])

    useEffect(() => {
        setAuthorCount(authorList.length);
    }, [authorList])

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

    const removeAuthor = async (author: AuthorModel) => {
        console.log(author);
        await $api.delete(`library/authors/${author.id}/`);
        setAuthorList(authorList.filter((item: AuthorModel) => item.id !== author.id));
    }

    return (
        <Layout>
            <div className={styles.wrapper}>
                <div className={[styles.flexer, styles.head].join(' ')}>
                    <div className={[styles.flexer, styles.textAndInput].join(' ')}>
                        <div>
                            <h2 className={styles.mainText}>Авторы</h2>
                            <p className={styles.smallText}>{authorCount} Автор{getEnding(authorCount)}</p>
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
                        to="/admin/authors/add">Добавить автора</Link>
                </div>
                <div className={styles.authorList}>
                    {
                        authorList.map((author: AuthorModel) => (
                            <AuthorItem
                                id={author.id}
                                key={author.id}
                                firstName={author.first_name}
                                lastName={author.last_name}
                                image={author.portrait}
                                description={author.biography}
                                remove={() => removeAuthor()}
                            />
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default AuthorListPage;