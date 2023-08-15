import React from "react";

import styles from "./AdminCard.module.css";
import { useNavigate } from "react-router-dom";

interface AdminCardProps {
    image?: string;
    name?: string;
    path?: string;
}

const AdminCard:React.FC<AdminCardProps> = ({
    image, name, path
}) => {
    const nav = useNavigate();

    return (
        <div onClick={() => nav(path, {replace: false})} className={styles.cardRect}>
            <div className={styles.cardContent}>
                <img src={image} height="45px"></img>
                <p>{name}</p>
            </div>
        </div>
    )
};

export default AdminCard;