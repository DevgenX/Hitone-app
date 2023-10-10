import React from "react";

interface AnalyticsProps {
  analytics: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ analytics }) => {
  const feedbackItems = analytics.split("- ");

  return (
    <div className="bg-black p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 ">Analytics</h2>
      <ul className="text-white  overflow-hidden ">
        {feedbackItems.map((item, index) => (
          // Trim the item text to remove leading/trailing spaces
          <li key={index} className="mb-2">
            {item.trim()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;
