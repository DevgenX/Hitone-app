import React from "react";

interface AnalyticsProps {
  analytics: string | null;
}

const AnalyticsComponent: React.FC<AnalyticsProps> = ({ analytics }) => {
  if (!analytics) {
    return null;
  }

  const feedbackItems = analytics.split("\n").filter((item) => item.trim());

  return (
    <div className="bg-transparent p-5 shadow-md">
      <ul className="text-white min-h-[400px] max-h-[400px] overflow-hidden hover:overflow-y-scroll">
        {feedbackItems.map((item, index) => (
          <li key={index} className="mb-5">
            {item.trim()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalyticsComponent;
