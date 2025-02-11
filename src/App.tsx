import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Workspace from "./components/Workspace/Workspace";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

type AppProps = {};

const App: FC<AppProps> = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/workspace" element={<Workspace />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};
export default App;
