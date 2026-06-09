import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import useAuthstore from "../store/authstore";
import SchoolDashboard from "../pages/SchoolDashboard";
import AddTeacher from "../pages/AddTeacher";
import Header from "../components/Header";

export default function AppRouter(){
    const user = useAuthstore((state) => state.user);

    return (
        <BrowserRouter>
            <Routes>
                {/* Login Route */}
                <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />

                {/* Dashboard Route */}
                <Route path="/dashboard" element={<SchoolDashboard />} />
                <Route path="/add-teacher" element={<AddTeacher />} />
                <Route path="/teachers" element={<div>Teachers List</div>}></Route>
            </Routes>
        </BrowserRouter>
    );
}