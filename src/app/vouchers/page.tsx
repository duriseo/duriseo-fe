"use client"
import styles from "@/styles/pages/VouchersPage.module.scss"
import VoucherQRModal from "../components/modals/VoucherQRModal";
import { useState } from "react";
import { TicketIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";
import { API_VOUCHERS } from "@/constants";

export default function VouchersPage() {
    const [showQRModal, setQRModal] = useState(false);
    const [qrData, setQRData] = useState("");
    const { data } = useSWR(API_VOUCHERS);
    const vouchers = data?.data?.vouchers;

    const handleItemClick = (id: number) => {
        const voucher = vouchers.find((v) => v.id === id);
        setQRData(voucher.code);
        setQRModal(true);
    };

    const humanizeStatus = (status: string) => {
        switch (status) {
            case "REDEEMED_TO_OTHER": return "사용 가능";
            case "REDEEMED_TO_OWNER": return "사용 완료";
        }
    };

    return (
        <>
            <VoucherQRModal setModal={setQRModal} showModal={showQRModal} data={qrData} />
            <div className={styles.base}>
                <div className={styles.items}>
                    {vouchers && vouchers.length ? vouchers.map((v) => (
                        <div key={v.id} className={styles.item} onClick={() => handleItemClick(v.id)}>
                            <span className={styles.status}>{humanizeStatus(v.status)}</span>
                            <h3 className={styles.title}>{v.restaurantName}</h3>
                            <p className={styles.description}>만료일자: {v.expireAt}</p>
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
