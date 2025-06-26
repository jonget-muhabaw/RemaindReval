import React, { useState } from "react";
import type { FormField } from "../../shared/types";

interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string | number>) => void;
  buttonLabel?: string;
}
export interface OptionType {
  value: string;
  label: string;
}

const ReusableForm: React.FC<FormProps> = ({
  fields,
  onSubmit,
  buttonLabel = "Submit",
}) => {
  // Initialize form data with empty values based on fields
  const [formData, setFormData] = useState<Record<string, string | number>>(
    fields.reduce((acc, field) => {
      acc[field.name] = ""; // Default value for each field
      return acc;
    }, {} as Record<string, string | number>)
  );

  // Handle changes for inputs, textareas, and selects
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update form data
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data to the parent component
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          {/* Label for the field */}
          <label htmlFor={field.name} className="text-sm font-medium mb-1">
            {field.label}
          </label>

          {/* Render based on the field type */}
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] as string}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
          ) : field.options ? (
            // Dropdown field
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleChange}
              required={field.required}
              className="border rounded-lg px-3 py-2"
            >
              {/* Placeholder option */}
              <option value="" disabled>
                Select {field.label}
              </option>
              {/* Render dropdown options */}
              {field.options.map((option) =>
                typeof option === "string" ? (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ) : (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                )
              )}
            </select>
          ) : (
            // Input field
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] as string}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
          )}
        </div>
      ))}
      {/* Submit button */}
      <button
        type="submit"
        className="flex justify-end bg-primary text-white rounded-lg px-4 py-2 hover:bg-blue-600"
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default ReusableForm;
