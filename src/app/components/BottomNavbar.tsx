"use client"
import styles from "@/styles/components/BottomNavbar.module.scss";
import { BuildingStorefrontIcon, MapIcon, TicketIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavbar = () => {
    const pathname = usePathname();

    return (
        <nav className={styles.base}>
            <ul className={styles.items}>
                <li className={styles.item}>
                    <Link className={[styles.link, pathname === "/" ? styles.active : ""].join(" ")} href="/">
                        <MapIcon className={styles.icon} />
                        <span>홈</span>
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link className={[styles.link, pathname === "/vouchers" ? styles.active : ""].join(" ")} href="/vouchers">
                        <TicketIcon className={styles.icon} />
                        <span>식권</span>
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link className={[styles.link, pathname === "/store" ? styles.active : ""].join(" ")} href="/store">
                        <BuildingStorefrontIcon className={styles.icon} />
                        <span>가게 관리</span>
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link className={[styles.link, pathname === "/profile" ? styles.active : ""].join(" ")} href="/profile">
                        <UserIcon className={styles.icon} />
                        <span>마이페이지</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default BottomNavbar;
