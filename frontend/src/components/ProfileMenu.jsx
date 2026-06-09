import { IconButton,Menu,MenuItem,Typography,Avatar,Box,Divider } from "@mui/material";
import { useState } from "react";
import useAuthstore from "../store/authstore";
import { useNavigate } from "react-router-dom";
import { AnchorRounded } from "@mui/icons-material";

export default function ProfileMenu(){
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const user = useAuthstore((state) => state.user);
    const role = useAuthstore((state) => state.role);
    const logout = useAuthstore((state) => state.logout);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar>{user?.name?.[0]}</Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                <Box sx={{px:2, py:1 }}>
                    <Typography variant="subtitle1">{user?.name}</Typography>
                    <Typography variant="body2">{user?.email}</Typography>
                    <Typography variant="caption">{role}</Typography>
                </Box>

                <Divider />

                <MenuItem onClick={handleLogout}>
                    <AnchorRounded sx={{mr:1}} />
                    Logout
                </MenuItem>

            </Menu>
        </>
    )
}
