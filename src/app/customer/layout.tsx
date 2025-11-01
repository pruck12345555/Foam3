import CustomerMenu from "./components/CustomerMenu";

export default function CustomerLayout( { children } : { children : React.ReactNode } ) {
    return (
        <div className="flex h-screen">
            <CustomerMenu />
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}