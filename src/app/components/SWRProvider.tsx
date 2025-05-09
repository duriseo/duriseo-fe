"use client"
import { api } from "@/libs/api";
import { SWRConfig } from "swr";

interface Props {
    children: React.ReactNode;
}

const SWRProvider = ({ children }: Props) => {
    return (
        <SWRConfig value={{ fetcher: (url: string) => api.get(url).then((response) => response.data) }}>
            {children}
        </SWRConfig>
    );
};

export default SWRProvider;
