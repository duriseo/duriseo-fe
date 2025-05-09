"use client"
import { API_AUTH_SIGNUP } from "@/constants";
import { api } from "@/libs/api";
import styles from "@/styles/pages/SignUpPage.module.scss"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignUpPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("DONOR");

    const handleSignup = async () => {
        const payload = { name, email, password, role };
        const response = await api.post(API_AUTH_SIGNUP, payload);
        console.log(response.data);

        if (response.code !== 201) {
            return toast.error(response.data.message || "요청을 처리하는 중 오류가 발생했습니다.");
        } else {
            toast.success("성공적으로 회원가입했습니다.");

            router.push("/profile");
        }
    };

    return (
        <>
            <div className={styles.base}>
                <h1 className={styles.title}>회원가입</h1>
                <div className={styles.inputWrapper}>
                    <div className={styles.input}>
                        <label htmlFor="name">이름</label>
                        <input id="name" type="text" placeholder="이름" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="email">이메일</label>
                        <input id="email" type="text" placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="password">비밀번호</label>
                        <input id="password" type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="role">회원 구분</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="RESTAURANT_OWNER">가게 사장님</option>
                            <option value="BENEFICIARY">사회적 약자</option>
                            <option value="DONOR">일반 사용자</option>
                        </select>
                    </div>
                </div>
                <button className={styles.submit} onClick={handleSignup}>회원가입</button>
            </div>
        </>
    );
};
