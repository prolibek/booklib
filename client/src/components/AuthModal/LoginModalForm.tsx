import React from "react";
import BasicModal from "~/ui/BasicModal/BasicModal";
import TextInput from "~/ui/TextInput/TextInput";
import Button from "~/ui/Button/Button";
import BrownText from "~/ui/BrownText/BrownText";
import styles from './AuthModal.module.css';

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
                <TextInput borderRadius="10px" fontSize="16px" width="100%" height="45px"/>
            </div>
            <div className={styles.inputWithText}>
                <p className={styles.grayText}>Пароль:</p>
                <TextInput borderRadius="10px" fontSize="16px" width="100%" height="45px"/>
            </div>
            <div className={styles.buttonWithText}>
                <Button width="100%" height="48px">
                    <BrownText borderRadius="10px" fontSize="18px">Зарегистрироваться</BrownText>
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