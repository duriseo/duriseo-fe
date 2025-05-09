"use client"
import styles from "@/styles/pages/SignUpPage.module.scss"

export default function SignUpPage() {
    return (
        <>
            <div className={styles.base}>
                <h1 className={styles.title}>회원가입</h1>
                <div className={styles.inputWrapper}>
                    <div className={styles.input}>
                        <label htmlFor="name">이름</label>
                        <input id="name" type="text" placeholder="이름" />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="email">이메일</label>
                        <input id="email" type="text" placeholder="이메일" />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="password">비밀번호</label>
                        <input id="password" type="password" placeholder="비밀번호" />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="type">회원 구분</label>
                        <select id="type">
                            <option value="RESTAURANT_OWNER">가게 사장님</option>
                            <option value="BENEFICIARY">사회적 약자</option>
                            <option value="DONOR">일반 사용자</option>
                        </select>
                    </div>
                </div>
                <button className={styles.submit} onClick={() => { }}>회원가입</button>
            </div>
        </>
    );
};
