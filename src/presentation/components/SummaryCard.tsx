import React from "react";
import SummaryCard from "./SummaryCard";
import EpatTable from "./EpatTable";

const Dashboard: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
        <SummaryCard />
  
      {/* Scrollable Table Section */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 max-w-full">
        <div className="overflow-x-auto">
          <EpatTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
