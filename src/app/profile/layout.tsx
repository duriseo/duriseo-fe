import Header from "../components/Header";
import ProtectedRoute from "../components/ProtectedRoute";

interface Props {
    children: Readonly<React.ReactNode>;
}

export default function ProfileLayout({ children }: Props) {
    return (
        <ProtectedRoute>
            <Header title="마이페이지" />
            {children}
        </ProtectedRoute>
    );
}
