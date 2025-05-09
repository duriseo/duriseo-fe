"use client"
import styles from "@/styles/pages/HomePage.module.scss";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import MarkerDrawer from "./components/drawers/MarkerDrawer";

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
    const [currentLocation, setCurrentLocation] = useState({});
    const [showMarkerDrawer, setMarkerDrawer] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(data[0]);
    const markers = [];

    const initialize = () => {
        if (!window.naver || !mapRef.current) return;
        console.log("map init");

        if (mapInstance.current) mapInstance.current.destroy();

        if (mapRef.current) {
            const center = new naver.maps.LatLng(currentLocation.lat, currentLocation.lng);

            const mapOptions = {
                center,
            };
            mapInstance.current = new naver.maps.Map(mapRef.current, mapOptions);

        }
    };

    useEffect(() => {
        initialize();
    }, [currentLocation]);

    useEffect(() => {
        if (mapInstance.current) addMarkers();
    }, [mapInstance.current]);

    // set markers after load
    const addMarkers = () => {
        data.forEach((d) => {
            const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(d.lat, d.lng),
                map: mapInstance.current,
                title: d.name,
            });

            markers.push(marker);

            naver.maps.Event.addListener(marker, "click", () => onMarkerClick(d.id));
        });
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        });

        return () => {
            if (mapInstance.current) {
                console.log("map destroy");
                mapInstance.current.destroy();
            }
        }
    }, []);

    const onMarkerClick = (id: string) => {
        console.log("click", id);
        const restaurant = data.find((d) => d.id === id);
        if (restaurant) setSelectedRestaurant(restaurant);
        setMarkerDrawer(true);
    };

    return (
        <>
            <MarkerDrawer showDrawer={showMarkerDrawer} setDrawer={setMarkerDrawer} restaurant={selectedRestaurant} />
            <div className={styles.base}>
                <div className={styles.map} id="map" ref={mapRef}></div>
                <Script src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`} onLoad={initialize} />
            </div>
        </>
    );
}
