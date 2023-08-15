import React from "react";

import { Link } from "react-router-dom";

import styles from "./GenreItem.module.css";

import edit_icon from "~/assets/images/edit_icon.svg";
import del_icon from "~/assets/images/delete_icon.svg";

interface GenreItemProps {
    id?: number;
    name: string;
    description: string;
    remove: () => void;
}

const GenreItem:React.FC<GenreItemProps> = ({
    id, name, description, remove
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.text}>
                <p className={styles.nameText}>{name}</p>
                <p className={styles.descText}>{description}</p>
            </div>
            <div className={styles.icons}>
                <img src={edit_icon}/>
                <img src={del_icon} onClick={remove}/>
            </div>
        </div>
    )
}

export default GenreItem;