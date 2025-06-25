import React, { useState } from "react";
import type { FormField } from "../../shared/types";
interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string | number>) => void;
  buttonLabel?: string;
}

const ReusableForm: React.FC<FormProps> = ({
  fields,
  onSubmit,
  buttonLabel = "Submit",
}) => {
  const [formData, setFormData] = useState<Record<string, string | number>>(
    fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as Record<string, string | number>)
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label
            htmlFor={field.name}
            className="text-sm font-medium mb-1"
          >
            {field.label}
          </label>
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
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            >
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
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
