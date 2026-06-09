import {Container,Typography, Button, Paper, Stack} from "@mui/material";
import useAuthstore from "../store/authstore";

export default function RoleSelection(){
    const setRole = useAuthstore((state) => state.setRole);

    const handleRole = (role) => {
        setRole(role);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 10, textAlign: "center"}}>
                <Typography variant="h5" gutterBottom>
                    Select Your Role
                </Typography>

                <Stack spacing={2} sx={{ mt: 3 }}>
                    <Button variant="contained" 
                            fullWidth 
                            onClick={() => handleRole("school")}>
                        School
                    </Button>
                    <Button variant="contained" 
                            fullWidth 
                            onClick={() => handleRole("teacher")}>
                        Teacher
                    </Button>
                    <Button variant="contained" 
                            fullWidth 
                            onClick={() => handleRole("student")}>
                        Student
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
}