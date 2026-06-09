import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import useAuthstore from "../store/authstore";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const user = useAuthstore((state) => state.user);
    const logout = useAuthstore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return(
        <AppBar position="static">
            <Toolbar sx={{ display:"flex", justifyContent:"space-between" }}>
                <div>
                    <Typography variant="h6">
                        Online Test System
                    </Typography>

                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}