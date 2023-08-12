import React from "react";

import styles from "./AdminCard.module.css";

interface AdminCardProps {
    image?: string;
    name?: string;
}

const AdminCard:React.FC<AdminCardProps> = ({
    image, name
}) => {
    return (
        <div className={styles.cardRect}>
            <div className={styles.cardContent}>
                <img src={image} height="45px"></img>
                <p>{name}</p>
            </div>
        </div>
    )
};

export default AdminCard;