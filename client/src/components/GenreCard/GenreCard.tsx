import React from "react";

import styles from "./GenreCard.module.css";

import edit_icon from "~/assets/images/edit_icon.svg";
import del_icon from "~/assets/images/delete_icon.svg";

interface GenreCardProps {
    id?: number;
    name: string;
    description: string;
}

const GenreCard:React.FC<GenreCardProps> = ({
    id, name, description
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.text}>
                <p className={styles.nameText}>{name}</p>
                <p className={styles.descText}>{description}</p>
            </div>
            <div className={styles.icons}>
                <img src={edit_icon} />
                <img src={del_icon} />
            </div>
        </div>
    )
}

export default GenreCard;