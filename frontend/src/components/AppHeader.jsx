import { AppBar,Toolbar,Typography,IconButton,Avatar,Box } from "@mui/material";    
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

export default function AppHeader({ title, showBack = false}){
    const navigate = useNavigate();

    return (
        <AppBar position="sticky" sx={{bgcolor: "#ee1616"}}>
            <Toolbar sx={{ display:"flex", justifyContent:"space-between" }}>
                {/*LEFT SIDE - BACK BUTTON AND TITLE*/}
                <Box display = "flex" alignItems="center">
                    {showBack && (
                        <IconButton color="inherit" onClick={() => navigate(-1)}>
                            <ArrowBackIcon />
                        </IconButton>
                    )}

                    <Typography varient="h6">
                        {title}
                    </Typography>
                </Box>
                {/*RIGHT SIDE - PROFILE AVATAR*/}

                <ProfileMenu />
                
            </Toolbar>
        </AppBar>
    )
}