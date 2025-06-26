import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReusableForm from "./ReusableForm";
import type { FormField as BaseFormField } from "../../shared/types";
import { useUpdateDocument } from "../../hooks/useDocument";
import { showSnackbar } from "../../utils/ShowSnackbar";
import { useLiaisonOfficers } from "../../hooks/useLiaisonOfficer";

interface ControlledFormField extends BaseFormField {
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const UpdateDocument: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { document } = location.state || {};

  // Early return if no document data is passed
  if (!document) {
    return (
      <p>
        No document data available. Please navigate from the documents list.
      </p>
    );
  }

  const { mutate } = useUpdateDocument();
  const {
    data: officersData,
    isLoading: isLoadingOfficers,
    isError: isFetchError,
  } = useLiaisonOfficers();

  // Initialize state with empty strings
  const [title, setTitle] = useState("");
  const [liaisonOfficerName, setLiaisonOfficerName] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  // Sync form fields state when document changes
  useEffect(() => {
    setTitle(document.title || "");
    setLiaisonOfficerName(document.liaison_officer_name || "");
    setDescription(document.description || "");
    setExpirationDate(document.expiration_date || "");
  }, [document]);

  const handleSubmit = (data: Record<string, string | number>) => {
    if (!data.title || !data.expirationDate || !data.liaisonOfficerName) {
      showSnackbar({
        message: "Please fill out all required fields.",
        icon: "error",
      });
      return;
    }

    mutate(
      {
        id: document.id, // pass the correct document id here
        data: {
          title: String(data.title),
          description: data.description ? String(data.description) : "",
          liaison_officer_name: String(data.liaisonOfficerName),
          expiration_date: String(data.expirationDate),
        },
      },
      {
        onSuccess: () => {
          showSnackbar({
            message: "Document updated successfully!",
            icon: "success",
          });
          navigate("/dashboard");
        },
        onError: (error: any) => {
          const status = error?.response?.status || null;
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to update document.";

          if (status === 401) {
            showSnackbar({
              message: "Unauthorized: Please login again.",
              icon: "error",
              duration: 4000,
            });
          } else if (status >= 500) {
            showSnackbar({
              message: "Server error, please try again later.",
              icon: "error",
              duration: 4000,
            });
          } else {
            showSnackbar({
              message,
              icon: "warning",
              duration: 4000,
            });
          }
        },
      }
    );
  };

  if (isLoadingOfficers) {
    return <p>Loading liaison officers...</p>;
  }

  if (isFetchError) {
    return <p>Failed to load liaison officers. Please try again.</p>;
  }

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
      type: "select",
      placeholder: "Select an officer",
      required: true,
      value: liaisonOfficerName,
      onChange: (e) => setLiaisonOfficerName(e.target.value),
      options:
        officersData?.data.map((officer) => ({
          value: officer.name,
          label: officer.name,
        })) || [],
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
      value: expirationDate,
      onChange: (e) => setExpirationDate(e.target.value),
    },
  ];

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-primary">Update Document</h1>
      <ReusableForm
        fields={fields}
        onSubmit={handleSubmit}
        buttonLabel="Update Document"
      />
    </div>
  );
};

export default UpdateDocument;
