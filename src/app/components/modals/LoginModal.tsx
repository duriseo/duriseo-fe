"use client"
import { useRouter } from "next/navigation";
import { Modal, ModalWrapper, ModalContent } from "../Modal";
import styles from "@/styles/components/modals/LoginModal.module.scss";
import { API_AUTH_LOGIN, API_AUTH_PROFILE } from "@/constants";
import { useState } from "react";
import { api } from "@/libs/api";
import { toast } from "sonner";
import { mutate } from "swr";

interface Props {
    showModal: boolean;
    setModal: (open: boolean) => void;
}

const LoginModal = ({ showModal, setModal }: Props) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const response = await api.post(API_AUTH_LOGIN, { email, password });
        console.log(response.data);

        if (response.code !== 200) {
            return toast.error("error");
        } else {
            document.cookie = `token=${response.data.token}; path=/; max-age=604800`; // 7일
            toast.success("성공적으로 로그인했습니다.");

            await mutate(API_AUTH_PROFILE);

            setModal(false);
        }
    };

    return (
        <Modal open={showModal} onOpenChange={setModal} dismissible={false}>
            <ModalWrapper>
                <ModalContent>
                    <div className={styles.base}>
                        <div className={styles.contentWrapper}>
                            <h3 className={styles.title}>회원 로그인</h3>
                            <input type="text" placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className={styles.actionWrapper}>
                            <button className={styles.submit} onClick={handleLogin}>로그인</button>
                            <p className={styles.description}>회원이 아니신가요? <span onClick={() => router.push("/sign_up")}>회원가입</span></p>
                        </div>
                    </div>
                </ModalContent>
            </ModalWrapper>
        </Modal>
    );
};

export default LoginModal;
