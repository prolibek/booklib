import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { login } from "~/features/auth/authSlice";
import authService from "~/services/authService";

import BasicModal from "~/ui/BasicModal/BasicModal";
import TextInput from "~/ui/TextInput/TextInput";
import Button from "~/ui/Button/Button";
import BrownText from "~/ui/BrownText/BrownText";
import styles from './AuthModal.module.css';

interface RegistrationModalProps {
    visible: boolean;
    setVisible: (name: boolean) => void;
    setLoginVisible: (name: boolean) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = 
    ({
        visible, 
        setVisible, 
        setLoginVisible
    }) => {
    
    const dispatch = useDispatch();

    const [emailValue, setEmailValue] = useState("");
    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    useEffect(() => {
        setUsernameMessage("")
    }, [usernameValue])

    useEffect(() => {
        setEmailMessage("")
    }, [emailValue])

    useEffect(() => {
        setPasswordMessage("")
    }, [passwordValue])

    const handleRegister = async () => {
        if(emailValue.trim() === "") {
            setEmailMessage("Это поле обязательно");
            return;
        }
        if(usernameValue.trim() === "") {
            setUsernameMessage("Это поле обязательно");
            return;
        }
        if(passwordValue.trim() === "") {
            setPasswordMessage("Это поле обязательно");
            return;
        }
        
        try {
            const response = await authService.register({
                email: emailValue,
                username: usernameValue,
                password: passwordValue
            })
            const access_token = response.access_token;
            const refresh_token = response.refresh_token;
            dispatch(login({
                access_token, 
                refresh_token
            }));
            setVisible(false);
        } catch (error) {
            if(error.response.data['email'][0] == "Enter a valid email address.")
                setEmailMessage("Введите корректную почту")
        }
    }

    return (
        <BasicModal 
            visible={visible} 
            setVisible={setVisible} 
            width="32%"
        >
            <p 
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif", 
                    fontSize: "48px"
                }}
            >
                Регистрация
            </p>
            <div className={styles.inputWithText}>
                <p className={styles.grayText}>Почта:</p>
                <TextInput 
                    borderRadius="10px" 
                    fontSize="16px" 
                    width="100%" 
                    height="45px"
                    value={emailValue}
                    handleChange={ (e: React.ChangeEvent<HTMLInputElement>) => {setEmailValue(e.target.value)} }

                    style={{
                        borderRadius: "10px",
                        fontSize: "16px",
                        width: "100%", 
                        height: "45px",
                        border: emailMessage.trim() === "" ? null : "1px solid rgb(101, 0, 0)" 
                    }}
                />
                <p className={styles.errorMessage}>{ emailMessage }</p>
            </div>
            <div className={styles.inputWithText}>
                <p className={styles.grayText}>Никнейм:</p>
                <TextInput 
                    borderRadius="10px" 
                    fontSize="16px" 
                    width="100%" 
                    height="45px"
                    value={usernameValue}
                    handleChange={ (e: React.ChangeEvent<HTMLInputElement>) => {setUsernameValue(e.target.value)}}
                
                    style={{
                        borderRadius: "10px",
                        fontSize: "16px",
                        width: "100%", 
                        height: "45px",
                        border: usernameMessage.trim() === "" ? null : "1px solid rgb(101, 0, 0)" 
                    }}
                />
                <p className={styles.errorMessage}>{ usernameMessage }</p>
            </div>
            <div className={styles.inputWithText}>
                <p className={styles.grayText}>Придумайте пароль:</p>
                <TextInput 
                    borderRadius="10px" 
                    fontSize="16px" 
                    width="100%" 
                    height="45px"
                    value={passwordValue}
                    handleChange={ (e: React.ChangeEvent<HTMLInputElement>) => {setPasswordValue(e.target.value)} }
                
                    style={{
                        borderRadius: "10px",
                        fontSize: "16px",
                        width: "100%", 
                        height: "45px",
                        border: passwordMessage.trim() === "" ? null : "1px solid rgb(101, 0, 0)" 
                    }}
                />
                <p className={styles.errorMessage}>{ passwordMessage }</p>
            </div>
            <div className={styles.buttonWithText}>
                <Button 
                    width="100%" 
                    height="48px"
                    fontSize="18px"
                    click={ () => {
                        handleRegister();
                    }}    
                >
                Зарегистрироваться
                </Button>Уже зарегистрированы? <a 
                    className={styles.changeModal}
                    onClick={
                        () => {
                            setVisible(false);
                            setLoginVisible(true);
                        }
                    }
                >Нажмите сюда!</a>
            </div>
        </BasicModal>
    );
};

export default RegistrationModal;