import React from "react";
import { FaEdit, FaTrash, FaFileExport } from "react-icons/fa";

interface RowData {
  userName: string;
  fullName: string;
  documentName: string;
  expiredDate: string;
  status: string;
  daysLeft: number;
}

const ExpatTable: React.FC = () => {
  const handleExport = (row: RowData) => {
    const csvData = `User Name,Full Name,Document Name,Expired Date,Status,Days Left\n${row.userName},${row.fullName},${row.documentName},${row.expiredDate},${row.status},${row.daysLeft}`;
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${row.fullName}-data.csv`;
    link.click();
  };

  const handleEdit = (row: RowData) => {
    console.log("Edit row:", row);
    // Add your edit logic here
  };

  const handleDelete = (row: RowData) => {
    console.log("Delete row:", row);
    // Add your delete logic here
  };

  const rows: RowData[] = [
    {
      userName: "alluwa2127@gmail.com",
      fullName: "Alex Muhabaw",
      documentName: "Passport",
      expiredDate: "07-12-2025",
      status: "Active",
      daysLeft: 35,
    },
    {
      userName: "muhabaw2127@gmail.com",
      fullName: "Sofonias Muhabaw",
      documentName: "Work Permit",
      expiredDate: "08-08-2025",
      status: "Renewal Required",
      daysLeft: 35,
    },
  ];

  return (
    <div className="mt-6 bg-white shadow-md rounded-xl overflow-x-auto">
      <table className="min-w-[900px] w-full text-left border-collapse table-auto">
        <thead className="bg-primary">
          <tr>
            <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
            </th>
            <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
              User Name
            </th>
            <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
              Full Name
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
            <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
              Export
            </th>
            <th className="px-4 py-2 text-xs md:text-sm font-medium text-white uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800">
                {row.userName}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs md:text-sm text-gray-800">
                {row.fullName}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpatTable;
