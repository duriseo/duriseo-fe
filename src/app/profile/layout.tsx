import Header from "../components/Header";

interface Props {
    children: Readonly<React.ReactNode>;
}

export default function ProfileLayout({ children }: Props) {
    return (
        <>
            <Header title="마이페이지" />
            {children}
        </>
    );
}
