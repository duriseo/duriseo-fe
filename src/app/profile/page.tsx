"use client"
import styles from "@/styles/pages/ProfilePage.module.scss"
import { UserIcon } from "@heroicons/react/24/outline";
import LoginModal from "../components/modals/LoginModal";
import { useState } from "react";

export default function ProfilePage() {
    const [showLoginModal, setLoginModal] = useState(true);

    return (
        <>
            <LoginModal setModal={setLoginModal} showModal={showLoginModal} />
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
        </>
    );
};
