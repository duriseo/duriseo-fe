"use client"
import styles from "@/styles/pages/ProfilePage.module.scss"
import { UserIcon } from "@heroicons/react/24/outline";
import useAuth from "@/hooks/useAuth";

export default function ProfilePage() {
    const { user, logout } = useAuth();

    return (
        <>
            <div className={styles.base}>
                <div className={styles.profileWrapper}>
                    <div className={styles.avatarWrapper}>
                        <UserIcon className={styles.avatar} />
                    </div>
                    <div className={styles.metaWrapper}>
                        <div className={styles.usernameWrapper}>
                            <h3>{user.name}</h3>
                            <span className={styles.role}>{user.role}</span>
                        </div>
                        <p className={styles.email}>{user.email}</p>
                    </div>
                </div>
                <div className={styles.authWrapper}>
                    <p onClick={logout}>로그아웃</p>
                </div>
            </div>
        </>
    );
};
