import type { Content } from "../types/Content";
import api from "../utils/axios";

export const fetchContents = async (): Promise<Content[]> => {
  const response = await api.get("/contents");
  return response.data;
};

export const fetchMyContents = async (): Promise<Content[]> => {
  const response = await api.get("/contents/my");
  return response.data;
};

export const fetchContentById = async (id: number): Promise<Content> => {
  const response = await api.get(`/contents/${id}`);
  return response.data;
};

export const createContent = async (
  content: Partial<Content>
): Promise<Content> => {
  const response = await api.post("/contents", content);
  return response.data;
};

export const updateContent = async (
  id: number,
  content: Partial<Content>
): Promise<Content> => {
  const response = await api.put(`/contents/${id}`, content);
  return response.data;
};

export const deleteContent = async (id: number): Promise<void> => {
  await api.delete(`/contents/${id}`);
};
