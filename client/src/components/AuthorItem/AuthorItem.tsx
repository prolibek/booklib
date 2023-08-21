import React from "react";

import { Link, useNavigate } from "react-router-dom";

import styles from "./AuthorItem.module.css";

import edit_icon from "~/assets/images/edit_icon.svg";
import del_icon from "~/assets/images/delete_icon.svg";

interface AuthorItemProps {
    id: number;
    firstName: string;
    lastName?: string;
    description?: string;
    image?: string;
    remove: () => void;
}

const AuthorItem:React.FC<AuthorItemProps> = ({
    id, firstName, lastName, description, image, remove
}) => {
    const nav = useNavigate();

    return (
        <div className={styles.card}>
            <div className={styles.text}>
                <img 
                    src={image}
                />
                <div>
                    <p className={styles.nameText}>{firstName} {lastName}</p>
                    <p className={styles.descText}>{description}</p>
                </div>
            </div>
            <div className={styles.icons}>
                <img src={edit_icon} onClick={() => nav(`/admin/authors/${id}`, {replace: false})}/>
                <img src={del_icon} onClick={remove}/>
            </div>
        </div>
    )
}

export default AuthorItem;