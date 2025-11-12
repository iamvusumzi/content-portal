import React from "react";
import { Grid, Box } from "@mui/material";
import type { Content } from "../types/Content";
import ContentCard from "./ContentCard";

interface ContentGridProps {
  contents: Content[];
  onView?: (content: Content) => void;
  onEdit?: (content: Content) => void;
  onDelete?: (contentId: number) => void;
  currentUser?: string;
  role?: "USER" | "ADMIN" | "PUBLIC";
}

const ContentGrid: React.FC<ContentGridProps> = ({
  contents,
  onView,
  onEdit,
  onDelete,
  currentUser,
  role = "PUBLIC",
}) => {
  const columns =
    contents.length <= 1
      ? { xs: 1, sm: 1, md: 1 }
      : contents.length === 2
      ? { xs: 1, sm: 2, md: 2 }
      : { xs: 1, sm: 2, md: 3 };
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Grid
        container
        spacing={3}
        columns={columns}
        justifyContent="start"
        alignItems="stretch"
        sx={{ maxWidth: "1200px", mx: "auto" }}
      >
        {contents.map((content) => {
          return (
            <Grid
              key={content.id}
              size={{ xs: 1, sm: 1, md: 1 }} // laptop/desktop (3 per row)
            >
              <Box sx={{ width: "100%", height: "100%" }}>
                <ContentCard
                  item={content}
                  username={currentUser}
                  role={role}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ContentGrid;
