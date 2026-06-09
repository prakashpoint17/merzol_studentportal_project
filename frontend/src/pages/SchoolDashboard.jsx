import {useEffect, useState} from "react";
import { TextField, Button, Container, Typography ,Grid, Paper} from "@mui/material";
import API from "../services/api";
import useAuthstore from "../store/authstore";
import AppHeader from "../components/AppHeader";
import { useNavigate } from "react-router-dom";
import { equal, maximum } from "firebase/firestore/pipelines";

export default function SchoolDashboard(){
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        teachers: 0,
        students: 0,
        tests: 0,
    })

    const user = useAuthstore((state) => state.user);

    useEffect(() => {
        // Fetch stats from backend
        const fetchStates = async () => {
            try {
                const res = await API.get("/school/dashboard/stats",{
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            }
        };
        fetchStates();
    }, []);

    return (
        <>
            <AppHeader title="School Login"/>

            <Container sx={{ mt: 3 , display:"flex", flexDirection:"column", gap:4}}>
                {/*STATS */}
                <Grid container spacing={2} sx={{justifyContent:"space-evenly"}}>
                    {[
                        {label: "Teachers enrolled", value: stats.teachers_count},
                        {label: "Students total", value: stats.students_count},
                        {label: "Test created", value: stats.tests_count},
                    ].map((item,i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <Paper sx={{p:3, textAlign:"center"}}>
                                <Typography variant="h4">{item.value}</Typography>
                                <Typography variant="body2">{item.label}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/*MENU*/}
                <Typography sx={{mt:4,mb:2}}> 
                    MENU
                </Typography>
                <Paper sx={{p:2}}>
                    <Button fullWidth  sx={{justifyContent:"space-between"}}
                    onClick={() => navigate("/add-teacher")}
                    >
                        Add Teachers →
                    </Button>
                    <Button fullWidth sx={{justifyContent:"space-between", mt:2}} onClick={() => navigate("/teachers")}>
                        Teachers →
                    </Button>

                </Paper>
            </Container>
        </>
    );
    
}
