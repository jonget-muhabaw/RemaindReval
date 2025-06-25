import React from "react";
import { useDocumentStats } from "../../hooks/useDocument";
// import Spinner from "../components/Spinner"; // Optional spinner component

const SummaryCard: React.FC = () => {
  const { data, isLoading, isError, error } = useDocumentStats();
console.log(`Response ${JSON.stringify(data?.total_documents)}`)
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
      <p>Loading..</p>
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 text-center">
        <p>Error: {error?.message || "Something went wrong!"}</p>
      </div>
    );

  const cards = [
    {
      title: "Total Expats",
      count: data?.total_documents ?? 0,
      color: "bg-primary",
    },
    {
      title: "Expiring Soon",
      count: data?.expiring_soon ?? 0,
      color: "bg-red-500",
    },
    {
      title: "Active",
      count: data?.active ?? 0,
      color: "bg-green-500",
    },
    {
      title: "Inactive",
      count: data?.expired ?? 0,
      color: "bg-gray-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <Card
          key={idx}
          title={card.title}
          count={card.count}
          color={card.color}
        />
      ))}
    </div>
  );
};

const Card: React.FC<{ title: string; count: number; color: string }> = ({
  title,
  count,
  color,
}) => (
  <div
    className={`mt-10 flex flex-col items-start justify-between p-4 rounded-lg shadow-md text-white ${color}`}
    style={{ height: "150px", width: "100%" }}
    aria-label={`${title}: ${count}`}
  >
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl font-bold">{count}</p>
  </div>
);

export default SummaryCard;
