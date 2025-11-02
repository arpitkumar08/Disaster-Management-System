import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CalendarDays } from "lucide-react";

const DisasterCard = ({ onClick }) => {
  const disasters = [
    { id: 1, name: "Flood", location: "Kerala, India", date: "2025-10-12" },
    { id: 2, name: "Earthquake", location: "Gujarat, India", date: "2025-09-28" },
    { id: 3, name: "Cyclone", location: "Odisha, India", date: "2025-08-15" },
   
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {disasters.map((disaster) => (
          <div
            key={disaster.id}
            onClick={() => onClick(disaster.id)} // ✅ Navigate when clicked
            className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer transition-all duration-300"
          >
            <h3 className="text-lg font-bold text-blue-700">{disaster.name}</h3>

            <p className="text-gray-600 flex items-center gap-2 mt-2">
              <FaLocationDot className="text-blue-600" />
              {disaster.location}
            </p>

            <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
              <CalendarDays className="h-4 text-blue-500" />
              {disaster.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisasterCard;
