"use client"
import styles from "@/styles/pages/VouchersPage.module.scss"
import { v4 as uuid } from "uuid";
import VoucherQRModal from "../components/modals/VoucherQRModal";
import { useState } from "react";
import { TicketIcon } from "@heroicons/react/24/outline";

const data = [
    {
        id: uuid(),
        restaurantName: "세종대학교",
        expiresAt: "2025-05-10T00:00:00Z",
        status: "ISSUED"
    },
    {
        id: uuid(),
        restaurantName: "세종대학교",
        expiresAt: "2025-05-10T00:00:00Z",
        status: "ISSUED"
    },
    {
        id: uuid(),
        restaurantName: "세종대학교",
        expiresAt: "2025-05-10T00:00:00Z",
        status: "ISSUED"
    },
    {
        id: uuid(),
        restaurantName: "세종대학교",
        expiresAt: "2025-05-10T00:00:00Z",
        status: "ISSUED"
    },

    {
        id: uuid(),
        restaurantName: "세종대학교",
        expiresAt: "2025-05-10T00:00:00Z",
        status: "ISSUED"
    },
];

export default function VouchersPage() {
    const [showQRModal, setQRModal] = useState(false);

    const handleItemClick = () => {
        setQRModal(true);
    };

    const humanizeStatus = (status: string) => {
        switch (status) {
            case "ISSUED": return "사용 가능";
            case "CONSUMED": return "사용 완료";
        }
    };

    return (
        <>
            <VoucherQRModal setModal={setQRModal} showModal={showQRModal} />
            <div className={styles.base}>
                <div className={styles.items}>
                    {data.length ? data.map((d) => (
                        <div key={d.id} className={styles.item} onClick={handleItemClick}>
                            <span className={styles.status}>{humanizeStatus(d.status)}</span>
                            <h3 className={styles.title}>{d.restaurantName}</h3>
                            <p className={styles.description}>만료일자: {d.expiresAt}</p>
                        </div>
                    )) : (
                        <div className={styles.emptyWrapper}>
                            <TicketIcon className={styles.icon} />
                            <h3 className={styles.title}>보유한 식권이 없어요.</h3>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
