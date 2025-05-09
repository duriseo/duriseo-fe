"use client"
import { API_AUTH_PROFILE } from "@/constants";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";

const useAuth = () => {
    const router = useRouter();
    const { data, error } = useSWR(API_AUTH_PROFILE, { shouldRetryOnError: false, revalidateOnFocus: true });

    const logout = async () => {
        try {
            localStorage.removeItem("token");

            await mutate(API_AUTH_PROFILE, null, false); // ← 캐시를 즉시 null로 설정
            router.replace("/");
            toast.success("성공적으로 로그아웃했습니다.");
        } catch (e) {
            console.error("Failed to sign out:", e);
        }
    };

    return { user: data?.data, isLoading: !error && !data, logout };
};

export default useAuth;
