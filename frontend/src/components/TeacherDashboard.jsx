import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import API from "../services/api";
import useAuthstore from "../store/authstore";

export default function TeacherDashboard() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const token = useAuthstore((state) => state.user.token);

    const addStudent = async () => {
        try {
            const res = await API.post(
                "/students",
                {email,name},
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(res.data.message);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <Typography variant="h4">
                Teacher Dashboard
            </Typography>

            <TextField 
                label="Student Name"
                fullWidth
                margin="normal"
                onChange={(e) => setName(e.target.value)}
            />

            <TextField 
                label = "Student Eamil"
                fullWidth
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
            />

            <Button variant="contained" onClick={addStudent}>
                Add Student
            </Button>
        </Container>
    );
}