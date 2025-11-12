import { useState, useMemo } from "react";
import type { Content } from "../types/Content";
import useContents from "./useContents";

import { useAuth } from "./useAuth";
import type { DialogMode } from "../types/Dialog";

export const useContentManager = (personalView: boolean = false) => {
  const { role: rawRole, username } = useAuth();

  const role = useMemo(() => {
    const upper = rawRole?.toUpperCase();
    if (upper === "ADMIN" || upper === "USER" || upper === "PUBLIC")
      return upper;
    return "PUBLIC";
  }, [rawRole]) as "USER" | "ADMIN" | "PUBLIC";

  const {
    contents,
    loading,
    error,
    addContent,
    updateExistingContent,
    removeContent,
    reload,
  } = useContents(personalView);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<DialogMode>("create");
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedContent(null);
  };

  const openCreate = () => {
    setSelectedContent({ title: "", desc: "", status: "DRAFT" } as Content);
    setMode("create");
    handleOpen();
  };

  const handleCreate = async (data: Partial<Content>) => {
    if (!data.title?.trim()) return;
    await addContent(
      data as Omit<Content, "id" | "dateCreated" | "dateUpdated">
    );
    handleClose();
  };

  const openEdit = (content: Content) => {
    setSelectedContent(content);
    setMode("edit");
    handleOpen();
  };

  const openView = (content: Content) => {
    setSelectedContent(content);
    setMode("view");
    handleOpen();
  };

  const handleUpdate = async (data: Partial<Content>) => {
    if (!selectedContent) return;
    await updateExistingContent(selectedContent.id, data);
    handleClose();
  };

  const handleDelete = async (id: number) => {
    await removeContent(id);
  };

  return {
    // content data
    contents,
    loading,
    error,
    reload,

    // modal & form
    open,
    mode,
    selectedContent,

    // handlers
    openCreate,
    openEdit,
    openView,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleClose,

    // user info
    username: username ?? undefined,
    role,
    personalView,
  };
};

export default useContentManager;
