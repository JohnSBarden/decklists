export type Theme = {
  name: string;
  icon: string;
  isDark: boolean;
};

export type ThemeConfig = {
  [key: string]: Theme;
};

export type ThemeChangeEvent = CustomEvent<{
  theme: string;
}>;
