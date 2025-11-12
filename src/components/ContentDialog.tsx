import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Typography,
  Divider,
  Box,
  Chip,
} from "@mui/material";
import type { Content } from "../types/Content";
import type { DialogMode } from "../types/Dialog";

interface ContentDialogProps {
  open: boolean;
  mode: DialogMode;
  initialData?: Partial<Content>;
  role?: "USER" | "ADMIN" | "PUBLIC";
  currentUser?: string;
  onClose: () => void;
  onSubmit?: (data: Partial<Content>) => void;
  onDelete?: (contentId: number) => void;
}

const ContentDialog: React.FC<ContentDialogProps> = ({
  open,
  mode,
  initialData = {},
  role = "PUBLIC",
  currentUser,
  onClose,
  onSubmit,
  onDelete,
}) => {
  const [dialogMode, setDialogMode] = React.useState<DialogMode>(mode);
  const [formData, setFormData] = React.useState({
    title: initialData.title || "",
    desc: initialData.desc || "",
    status: initialData.status || "DRAFT",
  });

  const isViewMode = dialogMode === "view";
  const isEditMode = dialogMode === "edit";
  const isCreateMode = dialogMode === "create";

  const isAuthor = initialData?.author === currentUser;
  const canEdit = isAuthor && !isCreateMode;
  const canDelete = isAuthor || role === "ADMIN";

  useEffect(() => {
    if (open) {
      setDialogMode(mode);
      setFormData({
        title: initialData.title || "",
        desc: initialData.desc || "",
        status: initialData.status || "DRAFT",
      });
    }
  }, [open, initialData, mode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
      if (isEditMode) setDialogMode("view"); // Switch back to view after saving
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle color="primary">
        {isCreateMode
          ? "Create New Content"
          : isEditMode
          ? "Edit Content"
          : "View Content"}
      </DialogTitle>

      <DialogContent dividers>
        {isViewMode && initialData ? (
          <>
            <Box mb={1}>
              <Typography variant="h6" color="primary">
                {initialData.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                By {initialData?.author || "Unknown"} •{" "}
                {initialData.dateCreated
                  ? new Date(initialData.dateCreated).toLocaleString()
                  : "—"}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              Description
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ whiteSpace: "pre-line" }}
            >
              {initialData.desc}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="subtitle1"
              fontWeight="bold"
              mb={0.5}
              color="primary"
            >
              Status
            </Typography>
            <Chip
              label={initialData.status}
              color={
                initialData.status === "PUBLISHED"
                  ? "success"
                  : initialData.status === "DRAFT"
                  ? "warning"
                  : "default"
              }
              size="medium"
            />
          </>
        ) : (
          <>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Description"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              margin="normal"
              fullWidth
              multiline
              rows={3}
            />

            {(role === "USER" || role === "ADMIN") && (
              <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                margin="normal"
                fullWidth
              >
                <MenuItem value="DRAFT">Draft</MenuItem>
                <MenuItem value="PUBLISHED">Published</MenuItem>
                <MenuItem value="ARCHIVED">Archived</MenuItem>
              </TextField>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        {isCreateMode || isEditMode ? (
          <Button
            variant="contained"
            disabled={
              formData.desc.trim() === "" || formData.title.trim() === ""
            }
            onClick={handleSubmit}
          >
            {isCreateMode ? "Create" : "Save"}
          </Button>
        ) : (
          <>
            {canEdit && (
              <Button variant="outlined" onClick={() => setDialogMode("edit")}>
                Edit
              </Button>
            )}
            {canDelete && onDelete && initialData.id && (
              <Button
                variant="contained"
                color="error"
                onClick={() => onDelete(initialData.id!)}
              >
                Delete
              </Button>
            )}
          </>
        )}
        <Button onClick={onClose}>{isViewMode ? "Close" : "Cancel"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContentDialog;
