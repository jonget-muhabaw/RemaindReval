import ReusableForm from "./ReusableForm";
import type { FormField } from "../../shared/types";

const RemainderForm = () => {
  const fields: FormField[] = [
    {
      name: "Full Name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter Full Name",
      required: true,
    },
    {
      name: "Email",
      label: "Email",
      type: "email",
      placeholder: "Enter Email ",
      required: true,
    },
    {
      name: "title",
      label: "Document Title",
      type: "text",
      placeholder: "Enter document title",
      required: true,
    },
    {
      name: "description",
      label: "Description about a document",
      type: "textarea",
      placeholder: "Enter description",
    },
    {
      name: "expirateDate",
      label: "Expiration Date",
      type: "date",
      required: true,
    },
    {
      name: "document type",
      label: "Document type",
      type: "text",
      placeholder: "Select document type",
      options: ["Passport", "Residence ID", "Work Permit"],
    },
  ];

  const handleSubmit = (data: Record<string, string | number>) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className=" text-2xl font-bold mb-4 text-primary ">Create Remainder</h1>
      <ReusableForm
        fields={fields}
        onSubmit={handleSubmit}
        buttonLabel="Save Remainder"
      />
    </div>
  );
};

export default RemainderForm;
