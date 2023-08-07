import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../../features/auth/authSlice";
import authService from "../../services/authService";

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

    const handleRegister = async () => {
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
        } catch (error) {
            throw new Error("error");
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
                />
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
                />
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
                />
            </div>
            <div className={styles.buttonWithText}>
                <Button 
                    width="100%" 
                    height="48px"
                    click={ () => {
                        handleRegister();
                        setVisible(false);
                    }}    
                >
                    <BrownText fontSize="18px">Зарегистрироваться</BrownText>
                </Button>
                <p>Уже зарегистрированы? <a 
                    className={styles.changeModal}
                    onClick={
                        () => {
                            setVisible(false);
                            setLoginVisible(true);
                        }
                    }
                >Нажмите сюда!</a></p>
            </div>
        </BasicModal>
    );
};

export default RegistrationModal;