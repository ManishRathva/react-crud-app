
import { Routes, Route } from "react-router-dom";
import Home from "../Container/Home/Home";
import Login from '../Login';
import Register from '../Register'

const Router = () => {
    return <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </>
}
export default Router;