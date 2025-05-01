import type { Metadata } from "next";
import "@/styles/global.scss";
import React from "react";

interface Props {
    children: Readonly<React.ReactNode>;
}

export const metadata: Metadata = {
    title: "duriseo-fe",
    description: "",
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="ko">
            <body>
                {children}
            </body>
        </html>
    );
}
