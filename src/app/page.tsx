"use client"
import styles from "@/styles/pages/HomePage.module.scss";
import Script from "next/script";
import { useEffect, useRef } from "react";

export default function HomePage() {
    const mapInstance = useRef<naver.maps.Map | null>(null);
    const mapRef = useRef<HTMLDivElement | null>(null);

    const initialize = () => {
        if (!window.naver || !mapRef.current) return;
        console.log("map init");

        if (mapInstance.current) mapInstance.current.destroy();

        if (mapRef.current) {
            mapInstance.current = new naver.maps.Map(mapRef.current);
        }
    };

    useEffect(() => {
        initialize();

        return () => {
            if (mapInstance.current) {
                console.log("map destroy");
                mapInstance.current.destroy();
            }
        }
    }, []);

    return (
        <div className={styles.base}>
            <div className={styles.map} id="map" ref={mapRef}></div>
            <Script src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`} onLoad={initialize} />
        </div>
    );
}
