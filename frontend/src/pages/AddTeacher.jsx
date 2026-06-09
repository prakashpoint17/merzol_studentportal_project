import AppHeader from "../components/AppHeader";
import { useEffect, useState } from "react";
import {Container, Typography, Button, Box, Paper, Tabs, Tab, Fade, TextField,List,ListItem,ListItemText,IconButton,Divider,Grid} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../services/api";
import useAuthstore from "../store/authstore";

export default function AddTeacher() {

    const user = useAuthstore((state) => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [teachers, setTeachers] = useState([]);

    // 🔁 Fetch teachers
    const fetchTeachers = async () => {
        try{
            const res = await API.get("/teachers",{
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });

            setTeachers(res.data.teachers);
        } catch (err) {
            console.error("Failed to fetch teachers", err);
        }
    };

    useEffect(() => {
        if (user?.token){
            fetchTeachers();
        }  
    }, [user?.token]);

    // ➕ Add teacher
    const handleAdd = async () => {
        try {
            const res = await API.post("/teachers",
                { name, email},
                {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            );

            alert(res.data.message);

            setName("");
            setEmail("");

            fetchTeachers();

        } catch (err) {
            console.error("Failed to add teacher", err);
        }
    };

    // ❌ Delete teacher
    const handleDelete = async (email) => {
        try {
            const res = await API.delete(`/teachers?email=${email}`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });

            alert(res.data.message);

            fetchTeachers();
        } catch (err) {
            console.error("Failed to delete teacher", err);
        }
    };

    return(
        <>
            <AppHeader title="Manage Teacher" showBack />

            <Container sx={{mt:3}}>

                {/* ➕ ADD FORM */}
                <Paper sx={{p:3, mb:3}}>
                    <Typography variant="h6">
                        Add New Teacher
                    </Typography>

                    <Grid container spacing={2} sx={{mt:1}}>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                label="Teacher Name"
                                fullWidth
                                onChange={(e)=>setName(e.target.value)}
                                value={name}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Email"
                                fullWidth
                                sx={{ mb: 2 }}
                                value = {email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        </Grid>
                    </Grid>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        disabled={!name || !email}
                        onClick={handleAdd}
                        sx={{mt:2}}>

                            Add Teacher
                    </Button>
                </Paper>
                
                {/* 👩‍🏫 TEACHERS LIST */}
                <Paper sx={{p:2}}>
                    <Typography variant="h6">Teachers List</Typography>

                    <List>
                        {teachers.map((teacher,index) => (
                            <div key={index}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton
                                        edge="end"
                                        color="error"
                                        onClick={() => handleDelete(teacher.email)}
                                        >
                                        <DeleteIcon />
                                        </IconButton>
                                    }
                                    >
                                    <Typography sx={{ mr: 2, fontWeight: "bold" }}>
                                        {index + 1}.
                                    </Typography>

                                    <ListItemText
                                        primary={teacher.name}
                                        secondary={teacher.email}
                                    />
                                </ListItem>

                                <Divider />
                            </div>
                        ))}
                    </List>

                    {teachers.length === 0 && (
                        <Typography align="center" sx={{mt:2}}>
                            No teachers added yet
                        </Typography>
                    )}
                </Paper>
            </Container>
        </>
    );
};