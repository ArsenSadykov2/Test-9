import ToolBar from "../ToolBar/ToolBar.tsx";


const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <>
            <header className="mb-5">
                <ToolBar/>
            </header>
            <main className="container">
                {children}
            </main>
        </>
    );
};

export default Layout;