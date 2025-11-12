import type { Content } from "./Content";

export interface ContentListProps {
  contents: Content[];
  loading?: boolean;
  role?: "USER" | "ADMIN" | "PUBLIC";
  onEdit?: (item: Content) => void;
  onDelete?: (item: Content) => void;
  onView?: (item: Content) => void;
}
