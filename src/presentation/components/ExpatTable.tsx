import React from "react";
import { FaEdit, FaTrash, FaFileExport } from "react-icons/fa";
import { useDocuments, useDelete } from "../../hooks/useDocument";
import { hasPermission } from "../../utils/RoleManager";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
interface RowData {
  id: number;
  officerEmail: string;
  officerName: string;
  documentName: string;
  expiredDate: string;
  description: string;
  daysLeft: number;
}

const ExpatTable: React.FC = () => {
  const { data, isLoading, isError, error } = useDocuments();
  const navigate = useNavigate();
  const isAdmin = hasPermission(["Admin"]);
  const deleteMutation = useDelete();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;
 


  const handleDelete = (row: RowData) => {
    if (!row.id) return;

    Swal.fire({
      title: "Delete Document?",
      text: `"${row.documentName}" will be deleted.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      heightAuto: false,
      customClass: {
        popup: "p-2 text-sm rounded-md", // Reduce padding & text size
        title: "text-base",
        confirmButton: "text-sm px-3 py-1",
        cancelButton: "text-sm px-3 py-1",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(
          { id: row.id },
          {
            onSuccess: () => {
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Successfully removed.",
                timer: 1200,
                showConfirmButton: false,
                heightAuto: false,
                customClass: {
                  popup: "p-2 text-sm rounded-md",
                  title: "text-sm",
                },
              });
            },
            onError: () => {
              Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to delete the document.",
                heightAuto: false,
                customClass: {
                  popup: "p-2 text-sm rounded-md",
                  title: "text-sm",
                },
              });
            },
          }
        );
      }
    });
  };
  
  
  
  const handleExport = (row: RowData) => {
    const csvData = `Liaison Officer Email Address,Full Name,Document Name,Expired Date,Status,Days Left\n${row.officerEmail},${row.officerName},${row.documentName},${row.expiredDate},${row.description},${row.daysLeft}`;
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${row.officerName}-data.csv`;
    link.click();
  };

  const handleEdit = (row: RowData) => {
    if (!row.id) {
      console.error("Document ID is missing");
      return;
    }
    navigate(`/update-document/${row.id}`, { state: { document: row } });
  };



  const rows: RowData[] = data
    ? data.map((doc) => ({
        id: doc.id,
        officerEmail: doc.liaisonOfficer.email,
        officerName: doc.liaisonOfficer?.name || "N/A",
        documentName: doc.title || "Untitled",
        expiredDate: doc.expiration_date
          ? doc.expiration_date.slice(0, 10)
          : "N/A",
        description: doc.description || "Unknown",
        daysLeft: doc.days_left || 0,
      }))
    : [];

  return (
    <div className="mt-6 bg-white shadow-md rounded-xl overflow-x-auto">
      <table className="min-w-[900px] w-full text-left border-collapse table-auto">
        <thead className="bg-primary">
          <tr>
            <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
            </th>
            <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
              Officer Email Address
            </th>
            <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
              Officer Name
            </th>
            <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
              Document Name
            </th>
            <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
              Expired Date
            </th>
            <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
             Description
            </th>
            <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
              Days Left
            </th>
            {isAdmin && (
              <>
                <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                  Export
                </th>
                <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800">
                {row.officerEmail}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800">
                {row.officerName}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800">
                {row.documentName}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800">
                {row.expiredDate}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800">
                {row.description}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800">
                {row.daysLeft}
              </td>
              {isAdmin && (
                <>
                  <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800">
                    <button
                      onClick={() => handleExport(row)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaFileExport size={18} />
                    </button>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800 flex space-x-2">
                    <button
                      onClick={() => handleEdit(row)}
                      className="text-green-500 hover:text-green-600"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(row)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpatTable;
