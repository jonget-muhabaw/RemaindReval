export interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "password" | "textarea" | "date";
  placeholder?: string;
  required?: boolean;
  options?: string[]; 
}
