import { Modal, ModalWrapper, ModalContent } from "../Modal";
import styles from "@/styles/components/modals/VoucherQRModal.module.scss";
import { QRCodeSVG } from "qrcode.react";

interface Props {
    showModal: boolean;
    setModal: (open: boolean) => void;
}

const VoucherQRModal = ({ showModal, setModal }: Props) => {
    return (
        <Modal open={showModal} onOpenChange={setModal}>
            <ModalWrapper>
                <ModalContent>
                    <div className={styles.base}>
                        <div className={styles.contentWrapper}>
                            <QRCodeSVG size={256} value="dd" />
                            <h3 className={styles.timer}>03:00</h3>
                            <p className={styles.description}>현재 화면을 직원에게 보여주세요.</p>
                        </div>
                        <button className={styles.submit} onClick={() => { }}>재발급</button>
                    </div>
                </ModalContent>
            </ModalWrapper>
        </Modal>
    );
};

export default VoucherQRModal;
