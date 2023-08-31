import styles from './Header.module.css';
import Logo from '~/ui/Logo/Logo';
import TextInput from '~/ui/TextInput/TextInput';
import RegistrationModal from '../AuthModal/RegistrationModalForm';
import LoginModal from '../AuthModal/LoginModalForm';

import { useState } from 'react';

import { Link } from 'react-router-dom';
import { useSelector, RootState, useDispatch } from 'react-redux';
import { logout } from "~/features/auth/authSlice";
import AuthService from '~/services/authService';

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
            <Link to="/" className={styles.navText}><Logo/></Link>
            <TextInput style={{
                width: "275px", 
                height: "40px", 
                fontSize: "16px"
            }}
            text = "Начните искать"
            />
            <div className={styles.navRows}>
                <Link to="" className={styles.navText}>Библиотека</Link>
                { authState.isAdmin &&
                    <Link 
                        to="/admin/" 
                        className={styles.navText}
                    >Админка</Link> 
                }
            </div>
            <p className={styles.navText}>
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
            </p>

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