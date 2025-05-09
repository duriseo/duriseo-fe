import styles from "@/styles/components/Header.module.scss";

interface Props {
    title: string;
}

const Header = ({ title }: Props) => {
    return (
        <header className={styles.base}>
            <div className={styles.wrapper}>
                <h2>{title}</h2>
            </div>
        </header>
    );
};

export default Header;
