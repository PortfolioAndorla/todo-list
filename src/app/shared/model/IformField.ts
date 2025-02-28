export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: { value: any; label: string }[];
  validators?: any[];
}
