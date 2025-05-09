import { useState } from "react";
import { Modal, ModalWrapper, ModalHeader, ModalTitle, ModalContent } from "../Modal";
import styles from "@/styles/components/modals/RegistryModal.module.scss";
import { toast } from "sonner";
import { api } from "@/libs/api";
import { API_RESTAURANTS } from "@/constants";
import Script from "next/script";

interface Props {
    showModal: boolean;
    setModal: (open: boolean) => void;
}

const RegistryModal = ({ showModal, setModal }: Props) => {
    const [isScriptLoaded, setScriptLoaded] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [isAddressValid, setAddressValid] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const handleSubmit = async () => {
        try {
            const payload = { name, address, phoneNumber, latitude, longitude };
            const response = await api.post(API_RESTAURANTS, payload);

            if (response.code !== 201) throw new Error(response.data.message);
            toast.success("가게를 등록했습니다.");
            setModal(false);
        } catch (e) {
            toast.error(e.message);
            setModal(false);
        }
    };

    const searchGeocode = (address: string) => {
        naver.maps.Service.geocode({
            query: address,
        }, (status, response) => {
            if (status !== naver.maps.Service.Status.OK) return toast.error("error while searchGeocode");

            const result = response.v2;
            if (result.addresses.length) {
                console.log(result.addresses);
                setAddress(result.addresses[0].roadAddress);
                setLatitude(Number(result.addresses[0].y));
                setLongitude(Number(result.addresses[0].x));
                setAddressValid(true);
            } else {
                return toast.error("검색 결과가 없습니다.");
            }
        });
    };

    return (
        <>
            <Modal open={showModal} onOpenChange={setModal}>
                <ModalWrapper>
                    <ModalHeader>
                        <ModalTitle>가게 등록</ModalTitle>
                    </ModalHeader>
                    <ModalContent>
                        <div className={styles.base}>
                            <div className={styles.contentWrapper}>
                                <input type="text" placeholder="이름" onChange={(e) => setName(e.target.value)} />
                                <div className={styles.inputWrapper}>
                                    <input type="text" placeholder="주소" onChange={(e) => setAddress(e.target.value)} disabled={isAddressValid} />
                                    <button onClick={() => searchGeocode(address)} disabled={!address.length}>찾기</button>
                                </div>
                                <input type="text" placeholder="가게 전화번호" onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div className={styles.actionWrapper}>
                                <button className={styles.submit} onClick={handleSubmit}>가게 등록</button>
                            </div>
                        </div>
                        <Script src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`} onLoad={() => setScriptLoaded(true)} />
                    </ModalContent>
                </ModalWrapper>
            </Modal>
        </>
    );
};

export default RegistryModal;
