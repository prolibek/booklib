import styles from './Header.module.css';
import Logo from '../ui/Logo/Logo';
import BrownText from "../ui/BrownText/BrownText";
import StronglyRoundedInput from "../ui/StronglyRoundedInput/StronglyRoundedInput";

const Header = () => {
    return (
        <div className={styles.header}>
            <Logo/>
            <StronglyRoundedInput width="275px" height="40px" fontSize="16px" text="Начните искать"/>
            <div className={styles.navRows}>
                <BrownText><a>Библиотека</a></BrownText>
                <BrownText><a>Админка</a></BrownText>
            </div>
            <BrownText><a>Войти</a></BrownText>
        </div> 
    );
};

export default Header;