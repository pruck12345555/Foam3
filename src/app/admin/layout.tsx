import StaffMenu from "./components/StaffMenu";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <StaffMenu />
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}