import Header from "../components/Header";

interface Props {
    children: Readonly<React.ReactNode>;
}

export default function VouchersLayout({ children }: Props) {
    return (
        <>
            <Header title="식권" />
            {children}
        </>
    );
}
