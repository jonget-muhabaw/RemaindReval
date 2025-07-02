import SummaryCard from "./SummaryCard";
import ExpatTable from "./ExpatTable";
import { useLoggedinUser } from "../../hooks/userAuth";

const Dashboard: React.FC = () => {
  const { data, isLoading, isError } = useLoggedinUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="flex flex-col p-4 min-h-screen">
      {/* Welcome Message */}
      <div className="mb-6 text-xl font-semibold">
        {isLoading ? (
          "Loading..."
        ) : isError ? (
          <span className="text-red-500">Failed to load user info</span>
        ) : (
          <span>
            {getGreeting()}, {data?.name} 👋
          </span>
        )}
      </div>

      {/* SummaryCard Section */}
      <div className="mb-4">
        <SummaryCard />
      </div>

      <div>
        <ExpatTable />
      </div>
    </div>
  );
};

export default Dashboard;
