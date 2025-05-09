"use client"
import styles from "@/styles/pages/VouchersPage.module.scss"
import { v4 as uuid } from "uuid";
import VoucherQRModal from "../components/modals/VoucherQRModal";
import { useState } from "react";

const data = [
    {
        id: uuid(),
        restaurantName: "세종대학교",
        expiresAt: "2025-05-10T00:00:00Z",
        status: "ISSUED"
    }
];

export default function VouchersPage() {
    const [showQRModal, setQRModal] = useState(false);

    const handleItemClick = () => {
        setQRModal(true);
    };

    return (
        <>
            <VoucherQRModal setModal={setQRModal} showModal={showQRModal} />
            <div className={styles.base}>
                <div className={styles.items}>
                    {data.map((d) => (
                        <div key={d.id} className={styles.item} onClick={handleItemClick}>
                            <span className={styles.status}>{d.status}</span>
                            <h3 className={styles.title}>{d.restaurantName}</h3>
                            <p className={styles.description}>만료일자: {d.expiresAt}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
