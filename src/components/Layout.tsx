import NavBar from "./NavBar";

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return <>
        <NavBar />
        <div>{children}</div>
    </>
}