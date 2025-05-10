import { Modal, ModalWrapper, ModalContent } from "../Modal";
import styles from "@/styles/components/modals/VoucherQRModal.module.scss";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";

interface Props {
    showModal: boolean;
    setModal: (open: boolean) => void;
    data: string;
}

const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
};

const VoucherQRModal = ({ showModal, setModal, data }: Props) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        setTimeLeft(180); // reset
        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        if (showModal) {
            startTimer();
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [showModal]);

    return (
        <Modal open={showModal} onOpenChange={setModal}>
            <ModalWrapper>
                <ModalContent>
                    <div className={styles.base}>
                        <div className={styles.contentWrapper}>
                            <QRCodeSVG size={256} value={data} />
                            <h3 className={styles.timer}>{formatTime(timeLeft)}</h3>
                            <p className={styles.description}>현재 화면을 직원에게 보여주세요.</p>
                        </div>
                        <button className={styles.submit} onClick={startTimer} disabled={!!timeLeft}>재발급</button>
                    </div>
                </ModalContent>
            </ModalWrapper>
        </Modal>
    );
};

export default VoucherQRModal;
