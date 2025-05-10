import type { Metadata } from "next";
import "@/styles/global.scss";
import React from "react";
import localFont from "next/font/local";
import BottomNavbar from "./components/BottomNavbar";
import { Toaster } from "sonner";
import SWRProvider from "./components/SWRProvider";

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
    title: "온밥 (ON:밥)",
    description: "",
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="ko">
            <body className={font.className}>
                <SWRProvider>
                    <Toaster position="top-center" />
                    <main>
                        {children}
                    </main>
                    <BottomNavbar />
                </SWRProvider>
            </body>
        </html>
    );
}
