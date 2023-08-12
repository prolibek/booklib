import React from "react";
import Layout from "~/components/Layout/Layout";
import AdminCard from "~/components/AdminCard/AdminCard";

import book_img from "~/assets/images/book_adminpanel.svg";
import author_img from "~/assets/images/author_adminpanel.svg";
import genre_img from "~/assets/images/genre_adminpanel.svg";

import styles from "./AdminPage.module.css";

const AdminPage = () => {
    return (
        <Layout>
            <div className={styles.wrapper}>
                <h1
                    className={styles.text}
                >Админ-панель сайта BOOKLIB</h1>
                <div className={styles.wrapper}>
                    <AdminCard
                        image={book_img}
                        name="Добавить книгу"
                    />
                    <AdminCard
                        image={author_img}
                        name="Добавить автора"
                    />
                    <AdminCard
                        image={genre_img}
                        name="Добавить жанр"
                    />
                </div>
            </div>
        </Layout>
    )
};

export default AdminPage;