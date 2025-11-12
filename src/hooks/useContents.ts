import { useEffect, useState, useCallback } from "react";
import {
  fetchContents,
  fetchMyContents,
  createContent,
  updateContent,
  deleteContent,
} from "../api/contentsApi";
import { useAuth } from "./useAuth";
import { useSnackbar } from "./useSnackbar";
import type { Content } from "../types/Content";

export const useContents = (personalView = false) => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { showMessage } = useSnackbar();

  const loadContents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data =
        personalView && isAuthenticated
          ? await fetchMyContents() // /api/contents/my
          : await fetchContents(); // /api/contents (public)
      setContents(data || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching contents");
    } finally {
      setLoading(false);
    }
  }, [personalView, isAuthenticated]);

  useEffect(() => {
    loadContents();
  }, [loadContents]);

  const addContent = async (
    content: Omit<Content, "id" | "dateCreated" | "dateUpdated">
  ) => {
    try {
      const newContent = await createContent(content);
      setContents((prev) => [newContent, ...prev]);
      showMessage("Content created successfully", "success");
    } catch (err) {
      console.error("Error creating content:", err);
      setError("Failed to create content");
      showMessage("Failed to create content", "error");
    }
  };

  const updateExistingContent = async (
    id: number,
    updatedContent: Partial<Content>
  ) => {
    try {
      const updated = await updateContent(id, updatedContent);
      setContents((prev) => prev.map((c) => (c.id === id ? updated : c)));
      showMessage("Content updated", "success");
    } catch (err) {
      console.error("Error updating content:", err);
      setError("Failed to update content");
      showMessage("Failed to update content", "error");
    }
  };

  const removeContent = async (id: number) => {
    try {
      await deleteContent(id);
      setContents((prev) => prev.filter((c) => c.id !== id));
      showMessage("Content deleted", "success");
    } catch (err) {
      console.error("Error deleting content:", err);
      setError("Failed to delete content");
      showMessage("Failed to delete content", "error");
    }
  };

  return {
    contents,
    loading,
    error,
    addContent,
    updateExistingContent,
    removeContent,
    reload: loadContents,
  };
};

export default useContents;
