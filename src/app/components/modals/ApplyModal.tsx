import { useState } from "react";
import { Modal, ModalWrapper, ModalHeader, ModalTitle, ModalContent } from "../Modal";
import styles from "@/styles/components/modals/ApplyModal.module.scss";
import { toast } from "sonner";
import { api } from "@/libs/api";
import { API_BENEFICIARIES_APPLY } from "@/constants";

interface Props {
    showModal: boolean;
    setModal: (open: boolean) => void;
}

const ApplyModal = ({ showModal, setModal }: Props) => {
    const [base64, setBase64] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            toast.error("PDF 파일만 업로드할 수 있습니다.");
            return;
        }

        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            setBase64(result.split(",")[1]); // Base64 인코딩 부분만 추출
        };
        reader.readAsDataURL(file); // Base64로 읽음
    };

    const handleSubmit = async () => {
        if (!base64) {
            toast.info("파일을 선택해주세요.");
            return;
        }

        try {
            const response = await api.post(API_BENEFICIARIES_APPLY, { documentUrl: base64 });

            if (response.code !== 201) throw new Error(response.data.message);
            toast.success("제출되었습니다.");
            setModal(false);
        } catch (e) {
            toast.error(e.message);
            setModal(false);
        }
    };

    return (
        <>
            <Modal open={showModal} onOpenChange={setModal}>
                <ModalWrapper>
                    <ModalHeader>
                        <ModalTitle>인증 서류 제출</ModalTitle>
                    </ModalHeader>
                    <ModalContent>
                        <div className={styles.base}>
                            <p className={styles.content}>{`PDF 형식의 인증 서류를 업로드해주세요. 인증이 완료되면 서비스를 이용하실 수 있어요.`}</p>
                            <input type="file" accept="application/pdf" onChange={handleFileChange} />
                            {fileName && <p>선택된 파일: {fileName}</p>}
                            <button className={styles.submit} onClick={handleSubmit}>제출하기</button>
                        </div>
                    </ModalContent>
                </ModalWrapper>
            </Modal>
        </>
    );
};

export default ApplyModal;
