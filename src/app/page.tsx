"use client"
import styles from "@/styles/pages/HomePage.module.scss";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import MarkerDrawer from "./components/drawers/MarkerDrawer";
import { ViewfinderCircleIcon } from "@heroicons/react/24/outline";

type LatLng = { lat: number, lng: number } | null;

const dummyData = [
    {
        id: uuid(),
        name: "세종대학교",
        address: "서울특별시 광진구 123",
        remainingVouchers: 12,
        lat: 37.55347197626422,
        lng: 127.07342497285599,
        phoneNumber: "123-456-789",
        createdAt: "2025-05-08T15:10:00Z"
    }
];

export default function HomePage() {
    const mapInstance = useRef<naver.maps.Map | null>(null);
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [data, setData] = useState(dummyData);
    const [currentLocation, setCurrentLocation] = useState<LatLng>(null);
    const [isScriptLoaded, setScriptLoaded] = useState(false);
    const [showMarkerDrawer, setMarkerDrawer] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(data[0]);
    const markers = useRef<naver.maps.Marker[]>([]);

    const initialize = () => {
        if (!mapRef.current || !currentLocation) return;

        console.log("map init");

        if (mapInstance.current) {
            mapInstance.current.destroy();
        }

        const center = new naver.maps.LatLng(currentLocation.lat, currentLocation.lng);

        const mapOptions = {
            center,
            zoom: 15,
        };

        mapInstance.current = new naver.maps.Map(mapRef.current, mapOptions);

        addMarkers(); // 초기화 이후 마커 추가
    };

    const updateCurrentLocation = () => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setCurrentLocation({ lat, lng });
            },
            () => {
                alert("위치 정보를 가져올 수 없습니다.");
            }
        );
    };

    const handleCurrentLocationClick = () => {
        if (!navigator.geolocation || !mapInstance.current) return;

        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const location = new naver.maps.LatLng(lat, lng);

            setCurrentLocation({ lat, lng });
            mapInstance.current?.panTo(location);
        });
    };

    const addMarkers = () => {
        if (!mapInstance.current) return;

        markers.current.forEach((m) => m.setMap(null)); // 기존 마커 제거
        markers.current = [];

        data.forEach((d) => {
            const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(d.lat, d.lng),
                map: mapInstance.current,
                title: d.name,
            });

            markers.current.push(marker);

            naver.maps.Event.addListener(marker, "click", () => onMarkerClick(d.id));
        });
    };

    const onMarkerClick = (id: string) => {
        console.log("click", id);
        const restaurant = data.find((d) => d.id === id);
        if (restaurant) setSelectedRestaurant(restaurant);
        setMarkerDrawer(true);
    };

    useEffect(() => {
        updateCurrentLocation(); // 처음에 위치 요청
        return () => {
            if (mapInstance.current) {
                console.log("map destroy");
                mapInstance.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        initialize();
    }, [isScriptLoaded, currentLocation]);

    useEffect(() => {
        if (mapInstance.current && currentLocation) {
            const center = new naver.maps.LatLng(currentLocation.lat, currentLocation.lng);
            mapInstance.current.setCenter(center);
        }
    }, [currentLocation]);;

    return (
        <>
            <MarkerDrawer showDrawer={showMarkerDrawer} setDrawer={setMarkerDrawer} restaurant={selectedRestaurant} />
            <div className={styles.base}>
                <div className={styles.branding}>
                    <h3>duriseo-fe</h3>
                </div>
                <div className={styles.currentLocation} onClick={handleCurrentLocationClick}>
                    <ViewfinderCircleIcon className={styles.icon} />
                </div>
                <div className={styles.map} id="map" ref={mapRef}></div>
                <Script src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`} onLoad={() => setScriptLoaded(true)} />
            </div>
        </>
    );
}
