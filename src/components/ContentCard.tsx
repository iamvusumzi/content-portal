import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Box,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import type { Content } from "../types/Content";

interface ContentCardProps {
  item: Content;
  username?: string;
  role?: "USER" | "ADMIN" | "PUBLIC";
  onEdit?: (item: Content) => void;
  onDelete?: (itemId: number) => void;
  onView?: (item: Content) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  item,
  username,
  role,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        width: "100%", // ensure uniform grid height
        minHeight: 260,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        boxShadow: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardHeader
        title={item.title}
        subheader={`By ${item.author}`}
        slotProps={{
          title: {
            variant: "h6",
          },
          subheader: { color: "primary" },
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.desc}
        </Typography>

        <Box mt={2} display="flex" alignItems="center" gap={1}>
          <Chip
            label={item.status}
            color={
              item.status === "PUBLISHED"
                ? "success"
                : item.status === "DRAFT"
                ? "warning"
                : "default"
            }
            size="medium"
          />
          <Typography variant="caption" color="text.secondary">
            {new Date(item.dateCreated).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ mt: "auto" }}>
        <Tooltip title="View Details">
          <IconButton color="primary" onClick={() => onView?.(item)}>
            <Visibility />
          </IconButton>
        </Tooltip>

        {(role === "ADMIN" || role === "USER") && (
          <>
            {item.author === username && (
              <Tooltip title="Edit Content">
                <IconButton color="secondary" onClick={() => onEdit?.(item)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            )}
            {(role === "ADMIN" || item.author === username) && (
              <Tooltip title="Delete Content">
                <IconButton color="error" onClick={() => onDelete?.(item.id)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ContentCard;
