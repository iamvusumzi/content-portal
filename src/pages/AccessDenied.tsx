import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h3" gutterBottom color="error" fontWeight={600}>
        Access Denied
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
        You don’t have permission to access this page.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </Box>
  );
};

export default AccessDenied;
