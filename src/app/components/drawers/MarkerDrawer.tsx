import { PhoneIcon, TicketIcon } from "@heroicons/react/24/outline";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "../Drawer";
import styles from "@/styles/components/drawers/MarkerDrawer.module.scss"
import VoucherConfirmationModal from "../modals/VoucherConfirmationModal";
import { useState } from "react";
import Link from "next/link";

interface Props {
    showDrawer: boolean;
    setDrawer: (open: boolean) => void;
    restaurant: any;
}

const MarkerDrawer = ({ showDrawer, setDrawer, restaurant }: Props) => {
    const [showModal, setModal] = useState(false);

    return restaurant ? (
        <>
            <VoucherConfirmationModal showModal={showModal} setModal={setModal} />
            <Drawer open={showDrawer} onOpenChange={setDrawer}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{restaurant.name}</DrawerTitle>
                        <DrawerDescription>{restaurant.address}</DrawerDescription>
                    </DrawerHeader>
                    <div className={styles.actions}>
                        <Link href={`tel:${restaurant.phoneNumber}`}>
                            <div className={styles.action}>
                                <PhoneIcon className={styles.icon} />
                                <span>전화</span>
                            </div>
                        </Link>
                        <div onClick={() => setModal(true)} className={[styles.action, styles.accent].join(" ")}>
                            <TicketIcon className={styles.icon} />
                            <span>식권 받기</span>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    ) : null;
};

export default MarkerDrawer;
