import React, { useState } from "react";

import authService from "../../services/authService";
import { login } from "../../features/auth/authSlice";

import BasicModal from "~/ui/BasicModal/BasicModal";
import TextInput from "~/ui/TextInput/TextInput";
import Button from "~/ui/Button/Button";
import BrownText from "~/ui/BrownText/BrownText";
import styles from './AuthModal.module.css';
import { useDispatch } from "react-redux";

interface LoginModalProps {
    visible: boolean;
    setVisible: (name: boolean) => void;
    setRegVisible: (name: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = 
    ({
        visible, 
        setVisible,
        setRegVisible
    }) => {

    const dispatch = useDispatch();

    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const handleLogin = async () => {
        try {
            const response = await authService.login({
                login_id: loginValue,
                password: passwordValue
            })
            const access_token = response.access_token;
            const refresh_token = response.refresh_token;
            dispatch(login({
                access_token, 
                refresh_token
            }));
        } catch (error) {
            console.log(error);
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
                Вход
            </p>
            <div className={styles.inputWithText}>
                <p className={styles.grayText}>Почта или никнейм:</p>
                <TextInput 
                    value={loginValue} 
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginValue(e.target.value)} 
                    borderRadius="10px" 
                    fontSize="16px" 
                    width="100%" 
                    height="45px"
                />
            </div>
            <div className={styles.inputWithText}>
                <p className={styles.grayText}>Пароль:</p>
                <TextInput 
                    value={passwordValue} 
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordValue(e.target.value)} 
                    borderRadius="10px" 
                    fontSize="16px" 
                    width="100%" 
                    height="45px"
                />
            </div>
            <div className={styles.buttonWithText}>
                <Button 
                    width="100%" 
                    height="48px"
                    click={() => {
                        console.log("Bob")
                        setVisible(false)
                        handleLogin()
                    }}
                >
                    <BrownText borderRadius="10px" fontSize="18px">Войти</BrownText>
                </Button>
                <p>Ещё не зарегистрированы? <a 
                    className={styles.changeModal}
                    onClick={
                        () => {
                            setVisible(false);
                            setRegVisible(true);
                        }
                    }
                >Нажмите сюда!</a></p>
            </div>
        </BasicModal>
    );
};

export default LoginModal;