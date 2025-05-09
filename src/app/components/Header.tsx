import styles from "@/styles/components/Header.module.scss";

const Header = () => {
    return (
        <header className={styles.base}>
            <div className={styles.wrapper}>
                <h1>duriseo-fe</h1>
            </div>
        </header>
    );
};

export default Header;
