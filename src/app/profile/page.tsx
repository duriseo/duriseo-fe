import styles from "@/styles/pages/ProfilePage.module.scss"
import { UserIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
    return (
        <div className={styles.base}>
            <div className={styles.profileWrapper}>
                <div className={styles.avatarWrapper}>
                    <UserIcon className={styles.avatar} />
                </div>
                <div className={styles.metaWrapper}>
                    <div className={styles.usernameWrapper}>
                        <h3>사용자 이름</h3>
                        <span className={styles.role}>관리자</span>
                    </div>
                    <p className={styles.email}>admin@duriseo.dev</p>
                </div>
            </div>
            <div className={styles.authWrapper}>
                <p>로그아웃</p>
            </div>
        </div>
    );
};
