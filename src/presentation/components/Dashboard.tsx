import SummaryCard from "./SummaryCard";
import ExpatTable from "./ExpatTable";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col p-4 min-h-screen">
      {/* SummaryCard Section */}
      <div className="mb-4">
        <SummaryCard />
      </div>

      <div>
        {" "}
        {/* No need for overflow-x-auto here */}
        <ExpatTable />
      </div>
    </div>
  );
};

export default Dashboard;
