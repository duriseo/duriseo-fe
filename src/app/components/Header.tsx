import styles from "@/styles/components/Header.module.scss";

interface Props {
    title: string;
}

const Header = ({ title }: Props) => {
    return (
        <header className={styles.base}>
            <div className={styles.wrapper}>
                <h1>{title}</h1>
            </div>
        </header>
    );
};

export default Header;
