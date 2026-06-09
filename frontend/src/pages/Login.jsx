import React, { useState } from "react";
import { Container, Typography, Button, Box, Paper, Tabs, Tab, Fade } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google"; // Corrected Import
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import useAuthstore from "../store/authstore";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [tab, setTab] = useState(0);
  const setUser = useAuthstore((state) => state.setUser);
  const setRole = useAuthstore((state) => state.setRole);
  const navigate = useNavigate();

  const roles = ["school", "teacher", "student"];

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const selectedRole = roles[tab];

      // Call Backend
      const res = await API.post("/login", {
        token: token,
        role: selectedRole,
      });

      if (res.data.status === "success") {
        setUser({
          name: result.user.displayName,
          email: result.user.email,
          token: token,
        });

        setRole(selectedRole);
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Unauthorized access");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden", // Prevents scrollbars during animation
        background: "linear-gradient(-45deg, #f58c8c, #fefbfb, #fbcdcd, #efebeb)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        "@keyframes gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <Container maxWidth="sm" 
        sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
        }}>

        <Fade in timeout={1000}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 4, sm: 6 },

              width: "100%",
              maxWidth: { xs: "100%", sm: "500px", md: "550px" },

              borderRadius: 5,
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px 0 rgba(33, 32, 32, 0.37)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            {/* Logo Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h3"
                fontWeight="800"
                sx={{ letterSpacing: -1, color: "#000000" }}
              >
                Online<span style={{ color: "#f90e0e" }}>Test</span>
              </Typography>

              <Typography variant="body1" color="textSecondary">
                Empowering education through digital excellence.
              </Typography>
            </Box>

            {/* Login Role Selection */}
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold", color: "#666" }}>
              Login as
            </Typography>

            <Tabs
              value={tab}
              onChange={(e, newValue) => setTab(newValue)}
              centered
              variant="fullWidth"
              sx={{
                mb: 4,
                "& .MuiTabs-indicator": { backgroundColor: "#f90e0e", height: 3 },
                "& .MuiTab-root": { fontWeight: "bold", textTransform: "none", fontSize: "1rem" },
                "& .Mui-selected": { color: "#f90e0e !important" },
              }}
            >
              <Tab label="School" />
              <Tab label="Teacher" />
              <Tab label="Student" />
            </Tabs>

            {/* Login Action Section */}
            <Box sx={{ py: 1 }}>
              <Typography variant="h6" fontWeight="600" sx={{ textTransform: "capitalize" }}>
                {roles[tab]} Access
              </Typography>

              <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
                Please use your authorized Google account to continue.
              </Typography>

              <Button
                variant="contained"
                startIcon={<GoogleIcon />}
                fullWidth
                onClick={handleGoogleLogin}
                sx={{
                  py: 1.5,
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  backgroundColor: "#f90e0e",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#b30a0a",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(249, 14, 14, 0.4)",
                  },
                }}
              >
                Sign in with Google
              </Button>
            </Box>

            {/* Footer */}
            <Typography variant="caption" display="block" sx={{ mt: 4, color: "#999" }}>
              © 2026 Online Test System. All rights reserved.
            </Typography>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}