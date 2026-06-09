import { Typography } from "@mui/material";
import useAuthstore from "../store/authstore";
import SchoolDashboard from "./SchoolDashboard";
import TeacherDashboard from "../components/TeacherDashboard";
import StudentDashboard from "../components/StudentDashboard";
import Header from "../components/Header";

export default function Dashboard(){
    const user = useAuthstore((state) => state.user);
    const role = useAuthstore((state) => state.role);

    
    return (
        <>
            <Header />

            {role === "school" && <SchoolDashboard />}
            {role === "teacher" && <TeacherDashboard />}
            {role === "student" && <StudentDashboard />}
        </>
    );
}