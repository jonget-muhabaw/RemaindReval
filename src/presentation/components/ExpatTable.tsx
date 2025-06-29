import React from "react";
import { FaEdit, FaTrash, FaFileExport } from "react-icons/fa";
import { useDocuments } from "../../hooks/useDocument";
import { hasPermission,getUserRole } from "../../utils/RoleManager";
import { useNavigate } from "react-router-dom";

interface RowData {
  id: number; 
  officerEmail: string;
  officerName: string;
  documentName: string;
  expiredDate: string;
  status: string;
  daysLeft: number;
}

const ExpatTable: React.FC = () => {
  const { data, isLoading, isError, error } = useDocuments();
  const navigate = useNavigate(); 
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  const handleExport = (row: RowData) => {
    const csvData = `Liaison Officer Email Address,Full Name,Document Name,Expired Date,Status,Days Left\n${row.officerEmail},${row.officerName},${row.documentName},${row.expiredDate},${row.status},${row.daysLeft}`;
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

  const handleDelete = (row: RowData) => {
    console.log("Delete row:", row);
  };

  const rows: RowData[] = data
    ? data.map((doc) => ({
      id:doc.id,
      officerEmail:doc.liaisonOfficer.email,
        officerName: doc.liaisonOfficer?.name || "N/A",
        documentName: doc.title || "Untitled",
        expiredDate: doc.expiration_date ? doc.expiration_date.slice(0, 10) : "N/A",
        status: doc.status || "Unknown",
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
              Status
            </th>
            <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
              Days Left
            </th>
           {
            hasPermission("Admin") &&
            (<th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
              Export
            </th>)}
          {  
          hasPermission("Admin") &&
          (<th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
              Actions
            </th>)}
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
                {row.status}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800">
                {row.daysLeft}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800">
               {
                hasPermission("Admin") &&
                (<button
                  onClick={() => handleExport(row)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <FaFileExport size={18} />
                </button>)}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800 flex space-x-2">
               {
                hasPermission("Admin") &&
               ( <button
                  onClick={() => handleEdit(row)}
                  className="text-green-500 hover:text-green-600"
                >
                  <FaEdit size={18} />
                </button>)}
            { 
            hasPermission("Admin")&&
             (  <button
                  onClick={() => handleDelete(row)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash size={18} />
                </button>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpatTable;
