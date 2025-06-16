import React from "react";

interface RowData {
  userName: string;
  fullName: string;
  documentName: string;
  expiredDate: string;
  status: string;
  daysLeft: number;
}

const EpatTable: React.FC = () => {
  const handleExport = (row: RowData) => {
    const csvData = `User Name,Full Name,Document Name,Expired Date,Status,Days Left\n${row.userName},${row.fullName},${row.documentName},${row.expiredDate},${row.status},${row.daysLeft}`;
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${row.fullName}-data.csv`;
    link.click();
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
    <div className="mt-6 overflow-x-auto bg-white shadow-md rounded-xl">
      <table className="w-full text-left border-collapse table-auto">
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
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Export
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EpatTable;
