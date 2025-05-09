import { useRouter } from "next/navigation";
import { Modal, ModalWrapper, ModalContent } from "../Modal";
import styles from "@/styles/components/modals/LoginModal.module.scss";

interface Props {
    showModal: boolean;
    setModal: (open: boolean) => void;
}

const LoginModal = ({ showModal, setModal }: Props) => {
    const router = useRouter();

    return (
        <Modal open={showModal} onOpenChange={setModal}>
            <ModalWrapper>
                <ModalContent>
                    <div className={styles.base}>
                        <div className={styles.contentWrapper}>
                            <h3 className={styles.title}>회원 로그인</h3>
                            <input type="text" placeholder="이메일" />
                            <input type="password" placeholder="비밀번호" />
                        </div>
                        <div className={styles.actionWrapper}>
                            <button className={styles.submit} onClick={() => { }}>로그인</button>
                            <p className={styles.description}>회원이 아니신가요? <span onClick={() => router.push("/sign_up")}>회원가입</span></p>
                        </div>
                    </div>
                </ModalContent>
            </ModalWrapper>
        </Modal>
    );
};

export default LoginModal;
