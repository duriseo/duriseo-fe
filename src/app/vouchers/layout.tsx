import Header from "../components/Header";
import ProtectedRoute from "../components/ProtectedRoute";

interface Props {
    children: Readonly<React.ReactNode>;
}

export default function VouchersLayout({ children }: Props) {
    return (
        <ProtectedRoute>
            <Header title="식권" />
            {children}
        </ProtectedRoute>
    );
}
