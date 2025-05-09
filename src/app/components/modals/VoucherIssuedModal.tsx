import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Modal, ModalWrapper, ModalContent } from "../Modal";
import styles from "@/styles/components/modals/VoucherIssuedModal.module.scss";
import { useRouter } from "next/navigation";
interface Props {
    showModal: boolean;
    setModal: (open: boolean) => void;
}

const VoucherIssuedModal = ({ showModal, setModal }: Props) => {
    const router = useRouter();

    const handleSubmit = () => {
        console.log("submit");
        setModal(false);
        router.push("/vouchers");
    };

    return (
        <Modal open={showModal} onOpenChange={setModal}>
            <ModalWrapper>
                <ModalContent>
                    <div className={styles.base}>
                        <div className={styles.contentWrapper}>
                            <CheckCircleIcon className={styles.icon} />
                            <p className={styles.content}>발급이 완료되었습니다.</p>
                        </div>
                        <button className={styles.submit} onClick={handleSubmit}>확인하러 가기</button>
                    </div>
                </ModalContent>
            </ModalWrapper>
        </Modal>
    );
};

export default VoucherIssuedModal;
