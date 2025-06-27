import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUpdateDocument } from "../../hooks/useDocument";
import { useLiaisonOfficers } from "../../hooks/useLiaisonOfficer";
import { showSnackbar } from "../../utils/ShowSnackbar";
import CompanyLogo from "../../assets/logo.png";

const UpdateDocument: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { document } = location.state || {};

  if (!document) {
    return (
      <p className="text-center text-red-500">
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

  const [title, setTitle] = useState("");
  const [liaisonOfficerName, setLiaisonOfficerName] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatDate = (date: string) => {
    return date.split("T")[0]; // Converts "2025-06-30T00:00:00.000Z" to "2025-06-30"
  };

  useEffect(() => {
    if (document) {
      setTitle(document.documentName || "");
      setLiaisonOfficerName(document.officerName || "");
      setDescription(document.status || ""); // Assuming `status` is used as description
      setExpirationDate(
        document.expiredDate ? formatDate(document.expiredDate) : ""
      );
    }
  }, [document]);

  const validateFields = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Document Title is required.";
    if (!liaisonOfficerName.trim())
      newErrors.liaisonOfficerName = "Liaison Officer must be selected.";
    if (!expirationDate.trim())
      newErrors.expirationDate = "Expiration Date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    mutate(
      {
        id: document.id,
        data: {
          title: title,
          description: description,
          liaison_officer_name: liaisonOfficerName,
          expiration_date: expirationDate,
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
        onError: (err: any) => {
          const message =
            err?.response?.data?.message || "Failed to update document.";
          showSnackbar({
            message,
            icon: "error",
          });
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

  return (
    <div className="p-6 max-w-lg mx-auto mt-20 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
        <img src={CompanyLogo} alt="Company Logo" className="w-36 h-auto" />
      </div>
      <h1 className="text-2xl font-bold text-primary mb-4">Update Document</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Document Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Document Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border rounded-lg ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter document title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Liaison Officer */}
        <div>
          <label
            htmlFor="liaisonOfficer"
            className="block text-sm font-medium text-gray-700"
          >
            Select Officer
          </label>
          <select
            id="liaisonOfficer"
            value={liaisonOfficerName}
            onChange={(e) => setLiaisonOfficerName(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border rounded-lg ${
              errors.liaisonOfficerName ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select an officer</option>
            {officersData?.data.map((officer: { name: string }) => (
              <option key={officer.name} value={officer.name}>
                {officer.name}
              </option>
            ))}
          </select>
          {errors.liaisonOfficerName && (
            <p className="text-red-500 text-sm">{errors.liaisonOfficerName}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter description"
          />
        </div>

        {/* Expiration Date */}
        <div>
          <label
            htmlFor="expirationDate"
            className="block text-sm font-medium text-gray-700"
          >
            Expiration Date
          </label>
          <input
            type="date"
            id="expirationDate"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border rounded-lg ${
              errors.expirationDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.expirationDate && (
            <p className="text-red-500 text-sm">{errors.expirationDate}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white rounded-lg shadow hover:bg-primary-dark transition"
        >
          Update Document
        </button>
      </form>
    </div>
  );
};

export default UpdateDocument;
