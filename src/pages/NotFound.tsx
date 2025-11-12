import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
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
      <Typography variant="h3" gutterBottom fontWeight={600}>
        404 — Page Not Found
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
        The page you’re looking for doesn’t exist or has been moved.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
