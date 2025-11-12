import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

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
    openCreate,
    openEdit,
    openView,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleClose,
    username,
    role,
  } = useContentManager(true);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600} color="primary">
          Your Contents
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
        >
          New Content
        </Button>
      </Box>

      {contents.length === 0 ? (
        <Typography>
          No content yet. Click “New Content” to create one.
        </Typography>
      ) : (
        <ContentGrid
          contents={contents}
          onView={openView}
          onEdit={openEdit}
          onDelete={handleDelete}
          currentUser={username}
          role={role}
        />
      )}

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
