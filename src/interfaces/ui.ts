import type { ThemeMode } from "@/types";

export interface UiState {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}
