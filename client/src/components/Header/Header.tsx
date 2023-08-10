import styles from './Header.module.css';
import Logo from '~/ui/Logo/Logo';
import BrownText from "~/ui/BrownText/BrownText";
import TextInput from '~/ui/TextInput/TextInput';
import RegistrationModal from '../AuthModal/RegistrationModalForm';
import LoginModal from '../AuthModal/LoginModalForm';

import { useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from "../../features/auth/authSlice";
import AuthService from '../../services/authService';

const Header = () => {

    const [regModal, setRegModal] = useState(false);
    const [loginModal, setLoginModal] = useState(false);

    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.auth);

    const handleLogout = async () => {
        const refresh = localStorage.getItem('refresh_token');
        const response = await AuthService.logout({ refresh });
        dispatch(logout(response));
    }

    return (
        <div className={styles.header}>
            <Logo/>
            <TextInput style={{
                width: "275px", 
                height: "40px", 
                fontSize: "16px"
            }}
            text = "Начните искать"
            />
            <div className={styles.navRows}>
                <BrownText><a className={styles.navText}>Библиотека</a></BrownText>
                <BrownText><a className={styles.navText}>Админка</a></BrownText>
            </div>
            <BrownText>
                {authState.isAuthenticated ? (
                    <a 
                        onClick={() => { handleLogout() }}
                        className={styles.navText}
                    >Выйти</a>
                ) : (
                    <a 
                        className={styles.navText}
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