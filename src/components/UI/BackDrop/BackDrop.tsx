import React from "react";

interface BackdropProps {
    show: boolean;
    onClick: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ show, onClick }) => {
    if (!show) {
        return null;
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
            }}
            onClick={onClick}
        />
    );
};

export default Backdrop;