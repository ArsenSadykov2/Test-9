import './App.css'
import Layout from "./components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Categories from "./containers/Categories/Categories.tsx";

function Home() {
    return null;
}

const App = () => (
    <>
        <Layout>
            <Routes>
                <Route
                    path="/"
                    element={(
                        <Home/>)}
                />
                <Route
                    path="/caterogies"
                    element={(<Categories/>)}
                />
                <Route
                    path="/add"
                    element={(<Home/>)}
                />
            </Routes>
        </Layout>

    </>
);

export default App
