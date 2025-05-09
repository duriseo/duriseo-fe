import { useEffect, useState } from "react";
import { Modal, ModalWrapper, ModalHeader, ModalTitle, ModalContent } from "../Modal";
import styles from "@/styles/components/modals/VoucherModal.module.scss";
import { toast } from "sonner";
import { api } from "@/libs/api";
import { API_RESTAURANTS, API_VOUCHERS } from "@/constants";
import useSWR from "swr";

interface Props {
    showModal: boolean;
    setModal: (open: boolean) => void;
}

const VoucherModal = ({ showModal, setModal }: Props) => {
    const { data } = useSWR(API_RESTAURANTS);
    const restaurants = data?.data.restaurants;
    const [count, setCount] = useState(1);
    const [expiredAt, setExpiredAt] = useState("2025-05-10");
    const [restaurantId, setRestaurantId] = useState("");

    const handleSubmit = async () => {
        try {
            const payload = { count, expiredAt };
            const response = await api.post(`${API_VOUCHERS}/${restaurantId}`, payload);

            if (response.code !== 201) throw new Error(response.data.message);
            toast.success("식권을 등록했습니다.");
            setModal(false);
        } catch (e) {
            toast.error(e.message);
            setModal(false);
        }
    };

    useEffect(() => {
        if (restaurants?.length && !restaurantId) {
            setRestaurantId(restaurants[0].id);
        }
    }, [restaurants]);

    return (
        <>
            <Modal open={showModal} onOpenChange={setModal}>
                <ModalWrapper>
                    <ModalHeader>
                        <ModalTitle>식권 등록</ModalTitle>
                    </ModalHeader>
                    <ModalContent>
                        <div className={styles.base}>
                            <div className={styles.contentWrapper}>
                                <div className={styles.input}>
                                    <label htmlFor="role">가게 선택</label>
                                    <select value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)}>
                                        {restaurants?.map((r) => (
                                            <option key={r.id} value={r.id}>{r.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.input}>
                                    <label htmlFor="count">식권 개수</label>
                                    <input id="count" type="number" placeholder="식권 개수" value={count} onChange={(e) => setCount(e.target.valueAsNumber)} />
                                </div>
                                <div className={styles.input}>
                                    <label htmlFor="expiry">유효기간</label>
                                    <input id="expiry" type="text" placeholder="유효기간" value={expiredAt} onChange={(e) => setExpiredAt(e.target.value)} />
                                </div>
                            </div>
                            <div className={styles.actionWrapper}>
                                <button className={styles.submit} onClick={handleSubmit}>식권 등록</button>
                            </div>
                        </div>
                    </ModalContent>
                </ModalWrapper>
            </Modal>
        </>
    );
};

export default VoucherModal;
