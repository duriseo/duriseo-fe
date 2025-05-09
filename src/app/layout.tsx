import type { Metadata } from "next";
import "@/styles/global.scss";
import React from "react";
import localFont from "next/font/local";
import BottomNavbar from "./components/BottomNavbar";
import Header from "./components/Header";

interface Props {
    children: Readonly<React.ReactNode>;
}

const font = localFont({
    src: "../../public/fonts/WantedSansVariable.woff2",
    fallback: ["-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "sans-serif"],
    display: "swap",
    weight: "400 950"
});

export const metadata: Metadata = {
    title: "duriseo-fe",
    description: "",
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="ko">
            <body className={font.className}>
                <Header />
                <main>
                    {children}
                </main>
                <BottomNavbar />
            </body>
        </html>
    );
}
