import './App.css';
import Layout from "./components/Layout/Layout.tsx";
import { Route, Routes } from "react-router-dom";
import Categories from "./containers/Categories/Categories.tsx";
import Home from "./containers/Home/Home.tsx";
import { useState } from "react";

const App = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Layout onAddClick={openModal}>
                <Routes>
                    <Route path="/" element={<Home showModal={showModal} onCloseModal={closeModal} />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/add" element={<Home showModal={showModal} onCloseModal={closeModal} />} />
                    <Route path="/add/:idTracker" element={<Home showModal={showModal} onCloseModal={closeModal} />} />
                </Routes>
            </Layout>
        </>
    );
};

export default App;