export type ButtonColorVariant = "primary" | "danger";

export interface ButtonColors {
  base: string;
  disabled: string;
}

export type ButtonTypeDefinitions = {
  [K in ButtonColorVariant]: ButtonColors
};
