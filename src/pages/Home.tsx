import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import ContentGrid from "../components/ContentGrid";
import ContentDialog from "../components/ContentDialog";
import useContentManager from "../hooks/useContentManager";

const ContentPage: React.FC = () => {
  const {
    contents,
    loading,
    error,
    reload,
    open,
    mode,
    selectedContent,
    openEdit,
    openView,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleClose,
    username,
    role,
  } = useContentManager(false);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography color="error">{error}</Typography>
        <Button variant="outlined" onClick={reload} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={600} color="primary">
        Welcome, {username ? username : "Guest"}
      </Typography>

      <ContentGrid
        contents={contents}
        currentUser={username}
        role={role}
        onView={openView}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <ContentDialog
        open={open}
        mode={mode}
        initialData={selectedContent || {}}
        currentUser={username}
        role={role}
        onClose={handleClose}
        onSubmit={mode === "create" ? handleCreate : handleUpdate}
        onDelete={handleDelete}
      />
    </Container>
  );
};

export default ContentPage;
