import React from "react";
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
                <TextInput borderRadius="10px" fontSize="16px" width="100%" height="45px"/>
            </div>
            <div className={styles.inputWithText}>
                <p className={styles.grayText}>Никнейм:</p>
                <TextInput borderRadius="10px" fontSize="16px" width="100%" height="45px"/>
            </div>
            <div className={styles.inputWithText}>
                <p className={styles.grayText}>Придумайте пароль:</p>
                <TextInput borderRadius="10px" fontSize="16px" width="100%" height="45px"/>
            </div>
            <div className={styles.buttonWithText}>
                <Button width="100%" height="48px">
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