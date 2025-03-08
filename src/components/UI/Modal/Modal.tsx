import React from "react";
import Backdrop from "../BackDrop/BackDrop.tsx";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, title, children }) => {
    if (!show) {
        return null;
    }

    return (
        <>
            <Backdrop show={show} onClick={onClose} />
            <div style={{
                position: "fixed",
                top: "20%",
                left: "50%",
                transform: "translateX(-50%)",
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3>{title}</h3>
                    <button className="btn btn-danger" onClick={onClose}>×</button>
                </div>
                <div>{children}</div>
            </div>
        </>
    );
};

export default Modal;