interface Props {
    children: Readonly<React.ReactNode>;
}

export default function SignUpLayout({ children }: Props) {
    return (
        <>
            {children}
        </>
    );
}
