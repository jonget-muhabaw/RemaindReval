import SummaryCard from "./SummaryCard";
import EpatTable from "./ExpatTable";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col p-4 min-h-screen">
      {/* SummaryCard Section */}
      <div className="mb-4">
        <SummaryCard />
      </div>

      {/* Table container: horizontal scroll only */}
      <div className="overflow-x-auto">
        <EpatTable />
      </div>
    </div>
  );
};

export default Dashboard;
