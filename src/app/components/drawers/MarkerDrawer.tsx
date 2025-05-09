import { PhoneIcon, TicketIcon } from "@heroicons/react/24/outline";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "../Drawer";
import styles from "@/styles/components/drawers/MarkerDrawer.module.scss"

interface Props {
    showDrawer: boolean;
    setDrawer: (open: boolean) => void;
    restaurant: any;
}

const MarkerDrawer = ({ showDrawer, setDrawer, restaurant }: Props) => {
    return (
        <Drawer open={showDrawer} onOpenChange={setDrawer}>
            <DrawerTrigger></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{restaurant.name}</DrawerTitle>
                    <DrawerDescription>{restaurant.address}</DrawerDescription>
                </DrawerHeader>
                <div className={styles.actions}>
                    <div className={styles.action}>
                        <PhoneIcon className={styles.icon} />
                        <span>전화</span>
                    </div>
                    <div className={[styles.action, styles.accent].join(" ")}>
                        <TicketIcon className={styles.icon} />
                        <span>식권 받기</span>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default MarkerDrawer;
