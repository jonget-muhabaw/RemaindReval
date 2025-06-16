import React from "react";

const SummaryCard: React.FC = () => {
  const cards = [
    { title: "Total Expats", count: 120, color: "bg-primary" },
    { title: "Expiring Soon", count: 15, color: "bg-red-500" },
    { title: "Active", count: 2, color: "bg-green-500" },
    { title: "Inactive", count: 2, color: "bg-gray-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
      {cards.map((card, idx) => (
        <div key={idx} className={`mt-10 flex flex-col items-start justify-between p-4  rounded-lg shadow-md text-white ${card.color} `} style={{height:"150px", width:"100%"}}>
          <h3 className={`text-lg font-semibold ${card.color}`}>{card.title}</h3>
          <p className="text-2xl font-bold">{card.count}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCard;