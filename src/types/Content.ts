export interface Content {
  id: number;
  title: string;
  desc: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  author: string;
  dateCreated: string;
  dateUpdated?: string;
}
