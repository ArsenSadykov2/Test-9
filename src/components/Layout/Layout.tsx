import React from "react";
import ToolBar from "../ToolBar/ToolBar.tsx";

interface LayoutProps {
    children: React.ReactNode;
    onAddClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onAddClick }) => {
    return (
        <div>
            <ToolBar onAddClick={onAddClick} />
            <main>{children}</main>
        </div>
    );
};

export default Layout;