import styles from './Header.module.css';
import Logo from '~/ui/Logo/Logo';
import BrownText from "~/ui/BrownText/BrownText";
import TextInput from '~/ui/TextInput/TextInput';
import RegistrationModal from '../RegistrationModalForm/RegistrationModalForm';
import { useState } from 'react';

const Header = () => {

    const [modal, setModal] = useState(false);

    return (
        <div className={styles.header}>
            <Logo/>
            <TextInput width="275px" height="40px" fontSize="16px" text="Начните искать"/>
            <div className={styles.navRows}>
                <BrownText><a>Библиотека</a></BrownText>
                <BrownText><a>Админка</a></BrownText>
            </div>
            <BrownText
                
            >
                <a onClick = {() => { 
                    setModal(true); 
                    console.log("Hi");
                }}>Войти</a>
            </BrownText>

            <RegistrationModal 
                visible={modal} 
                setVisible={setModal}
            />
        </div> 
    );
};

export default Header;