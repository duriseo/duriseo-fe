"use client"
import styles from "@/styles/pages/HomePage.module.scss";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import MarkerDrawer from "./components/drawers/MarkerDrawer";
import { ViewfinderCircleIcon } from "@heroicons/react/24/outline";
import { API_RESTAURANTS } from "@/constants";
import useSWR from "swr";

type LatLng = { lat: number, lng: number } | null;

export default function HomePage() {
    const mapInstance = useRef<naver.maps.Map | null>(null);
    const mapRef = useRef<HTMLDivElement | null>(null);
    const { data } = useSWR(API_RESTAURANTS);
    const [currentLocation, setCurrentLocation] = useState<LatLng>(null);
    const [isScriptLoaded, setScriptLoaded] = useState(false);
    const [showMarkerDrawer, setMarkerDrawer] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
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
        if (!mapInstance.current || !data) return;

        markers.current.forEach((m) => m.setMap(null)); // 기존 마커 제거
        markers.current = [];

        data.data.restaurants.forEach((restaurant) => {
            const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(restaurant.latitude, restaurant.longitude),
                map: mapInstance.current,
                title: restaurant.name,
                icon: {
                    content: `<div style="background: #43a44f;width:3rem;height:3rem;border:2px solid white;border-radius:50%;padding:.5rem;color:white;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
</svg></div>`,
                    size: new naver.maps.Size(48, 48),
                    anchor: new naver.maps.Point(24, 24)
                }
            });

            markers.current.push(marker);

            naver.maps.Event.addListener(marker, "click", () => onMarkerClick(restaurant.id));
        });
    };

    const onMarkerClick = (id: string) => {
        console.log("click", id);
        const restaurant = data?.data.restaurants.find((r) => r.id === id);
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

    // useEffect(() => {
    //     if (isScriptLoaded && currentLocation && mapInstance.current && data) {
    //         console.log("addMarkers");
    //         addMarkers();
    //     }
    // }, [data]);

    useEffect(() => {
        initialize();
        if (data)
            addMarkers();
    }, [isScriptLoaded, currentLocation, data]);

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
                    <h3>온밥 (ON:밥)</h3>
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
