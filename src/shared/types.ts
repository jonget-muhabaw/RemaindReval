import type { OptionType } from "../presentation/components/ReusableForm";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "date";
  placeholder?: string;
  required?: boolean;
  options?: Array<string | OptionType>;
}
