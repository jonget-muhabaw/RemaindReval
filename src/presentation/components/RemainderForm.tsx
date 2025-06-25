import ReusableForm from "./ReusableForm";
import type { FormField as BaseFormField } from "../../shared/types";
import { useCreateDocument } from "../../hooks/useDocument";
import { useState } from "react";

interface ControlledFormField extends BaseFormField {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const RemainderForm = () => {
  const { mutate, isError, error } = useCreateDocument();

  const [title, setTitle] = useState("");
  const [liaison_officer_name, setLiaisonOfficerName] = useState("");
  const [description, setDescription] = useState("");
  const [expiration_date, setExpirationDate] = useState("");

  if (isError) return <p>Error: {error?.message}</p>;

  const handleSubmit = (data: Record<string, string | number>) => {
    mutate(
      {
        title: String(data.title),
        description: data.description ? String(data.description) : undefined,
        liaison_officer_name: String(data.liaisonOfficerName),
        expiration_date: String(data.expirationDate),
      },
      {
        onSuccess: () => {
          alert("Document Created successfully");
          setTitle("");
          setLiaisonOfficerName("");
          setDescription("");
          setExpirationDate("");
        },
      }
    );
  };
  
  const fields: ControlledFormField[] = [
    {
      name: "title",
      label: "Document Title",
      type: "text",
      placeholder: "Enter document title",
      required: true,
      value: title,
      onChange: (e) => setTitle(e.target.value),
    },
    {
      name: "liaisonOfficerName",
      label: "Select Officer",
      type: "text",
      placeholder: "Enter officer name",
      required: true,
      value: liaison_officer_name,
      onChange: (e) => setLiaisonOfficerName(e.target.value),
    },
    {
      name: "description",
      label: "Description about the document",
      type: "textarea",
      placeholder: "Enter description",
      value: description,
      onChange: (e) => setDescription(e.target.value),
    },
    {
      name: "expirationDate",
      label: "Expiration Date",
      type: "date",
      required: true,
      value: expiration_date,
      onChange: (e) => setExpirationDate(e.target.value),
    },
  ];

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-primary">Create Remainder</h1>
      <ReusableForm
        fields={fields}
        onSubmit={handleSubmit}
        buttonLabel="Save Remainder"
      />
    </div>
  );
};

export default RemainderForm;
