import React from "react";
import SummaryCard from "./SummaryCard";
import EpatTable from "./EpatTable";

const Dashboard: React.FC = () => {
  return (
    // Use flexbox to create a column layout
    // h-screen makes the dashboard take the full viewport height
    <div className="h-screen flex flex-col">
      {/* Summary Card will naturally sit at the top */}
      {/* No need for sticky or z-index here as it's the first flex item */}
      <div className="p-4">
        {" "}
        {/* Keep padding for spacing */}
        <SummaryCard />
      </div>

      {/* Scrollable Table Section */}
      {/* flex-1 makes this div take up all remaining vertical space */}
      {/* overflow-y-auto ensures only this section scrolls */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {" "}
        {/* Add padding for table content */}
        <EpatTable />
      </div>
    </div>
  );
};

export default Dashboard;
