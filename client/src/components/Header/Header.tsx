import styles from './Header.module.css';
import Logo from '~/ui/Logo/Logo';
import BrownText from "~/ui/BrownText/BrownText";
import TextInput from '~/ui/TextInput/TextInput';
import RegistrationModal from '../AuthModal/RegistrationModalForm';
import LoginModal from '../AuthModal/LoginModalForm';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'react-redux';

const Header = () => {

    const [regModal, setRegModal] = useState(false);
    const [loginModal, setLoginModal] = useState(false);

    const authState = useSelector((state: RootState) => state.auth);

    return (
        <div className={styles.header}>
            <Logo/>
            <TextInput width="275px" height="40px" fontSize="16px" text="Начните искать"/>
            <div className={styles.navRows}>
                <BrownText><a>Библиотека</a></BrownText>
                <BrownText><a>Админка</a></BrownText>
            </div>
            <BrownText>
                {authState.isAuthenticated ? (
                    <a>Выйти</a>
                ) : (
                    <a
                    onClick={() => {
                        setLoginModal(true);
                    }}
                    >
                    Войти
                    </a>
                )}
            </BrownText>

            <RegistrationModal 
                visible={regModal} 
                setVisible={setRegModal}
                setLoginVisible={setLoginModal}
            />
            <LoginModal
                visible={loginModal}
                setVisible={setLoginModal}
                setRegVisible={setRegModal}
            />

        </div> 
    );
};

export default Header;