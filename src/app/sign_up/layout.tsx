import Header from "../components/Header";

interface Props {
    children: Readonly<React.ReactNode>;
}

export default function SignUpLayout({ children }: Props) {
    return (
        <>
            {/* <Header title="회원가입" /> */}
            {children}
        </>
    );
}
