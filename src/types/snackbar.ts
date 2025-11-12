export type SnackbarSeverity = "success" | "error" | "warning" | "info";
export interface SnackbarContextType {
  showMessage: (message: string, severity?: SnackbarSeverity) => void;
}
