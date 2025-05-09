"use client"
import styles from "@/styles/pages/ProfilePage.module.scss"
import { UserIcon } from "@heroicons/react/24/outline";
import useAuth from "@/hooks/useAuth";
import ApplyModal from "../components/modals/ApplyModal";
import { useState } from "react";
import RegistryModal from "../components/modals/RegistryModal";

export default function ProfilePage() {
    const [showApplyModal, setApplyModal] = useState(false);
    const [showRegistryModal, setRegistryModal] = useState(false);
    const { user, logout } = useAuth();

    const handleApplyClick = () => {
        setApplyModal(true);
    };

    const handleRegistryClick = () => {
        setRegistryModal(true);
    };

    const humanizeRole = (role: string) => {
        switch (role) {
            case "BENEFICIARY": return "사회적 약자";
            case "DONOR": return "일반 사용자";
            case "RESTAURANT_OWNER": return "가게 사장님";
        }
    };

    return (
        <>
            <ApplyModal setModal={setApplyModal} showModal={showApplyModal} />
            <RegistryModal setModal={setRegistryModal} showModal={showRegistryModal} />
            <div className={styles.base}>
                <div className={styles.profileWrapper}>
                    <div className={styles.avatarWrapper}>
                        <UserIcon className={styles.avatar} />
                    </div>
                    <div className={styles.metaWrapper}>
                        <div className={styles.usernameWrapper}>
                            <h3>{user.name}</h3>
                            <span className={styles.role}>{humanizeRole(user.role)}</span>
                        </div>
                        <p className={styles.email}>{user.email}</p>
                    </div>
                </div>
                {user.role === "BENEFICIARY" &&
                    <div className={styles.item}>
                        <p>인증 서류 제출</p>
                        <span className={styles.apply} onClick={handleApplyClick}>제출하기</span>
                    </div>
                }
                {user.role === "RESTAURANT_OWNER" &&
                    <div className={styles.item}>
                        <p>가게 관리</p>
                        <span className={styles.apply} onClick={handleRegistryClick}>가게 등록</span>
                    </div>
                }
                <div className={styles.authWrapper}>
                    <p onClick={logout}>로그아웃</p>
                </div>
            </div>
        </>
    );
};
