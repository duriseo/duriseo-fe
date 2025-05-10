import { Modal, ModalWrapper, ModalHeader, ModalTitle, ModalContent } from "../Modal";
import styles from "@/styles/components/modals/VoucherConfirmationModal.module.scss";
import VoucherIssuedModal from "./VoucherIssuedModal";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/libs/api";
import { API_VOUCHERS_ACQUIRED } from "@/constants";
interface Props {
    showModal: boolean;
    setModal: (open: boolean) => void;
    voucherId: number;
}

const VoucherConfirmationModal = ({ showModal, setModal, voucherId }: Props) => {
    const [showIssuedModal, setIssuedModal] = useState(false);

    const handleSubmit = async () => {
        console.log("submit");

        try {
            const response = await api.post(`${API_VOUCHERS_ACQUIRED}/${voucherId}`, {});

            if (response.code !== 200) throw new Error(response.data.message);
            setModal(false);
            setIssuedModal(true);
        } catch (e) {
            toast.error(e.message);
            setModal(false);
        }
    };

    return (
        <>
            <VoucherIssuedModal setModal={setIssuedModal} showModal={showIssuedModal} />
            <Modal open={showModal} onOpenChange={setModal}>
                <ModalWrapper>
                    <ModalHeader>
                        <ModalTitle>식권 발급 확인</ModalTitle>
                    </ModalHeader>
                    <ModalContent>
                        <div className={styles.base}>
                            <p className={styles.content}>정말 발급하시겠어요? 한번 발급하면 되돌릴 수 없어요.</p>
                            <button className={styles.submit} onClick={handleSubmit}>발급하기</button>
                        </div>
                    </ModalContent>
                </ModalWrapper>
            </Modal>
        </>
    );
};

export default VoucherConfirmationModal;
