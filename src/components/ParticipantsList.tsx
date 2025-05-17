import React from "react";
import { Camera, MicOff } from "lucide-react";

const ParticipantsList: React.FC = () => {
  return (
    <div className="mb-6 h-full overflow-y-auto">
      <ul className="space-y-3">
        {["Me", "Catherine", "Park Cho", "Alex", "Sophia", "Michael"].map((name, i) => (
          <li
            key={i}
            className="flex items-center justify-between bg-white p-2 rounded shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0" />
              <span className="text-sm sm:text-base truncate">{name}</span>
            </div>
            <div className="flex gap-2">
              <Camera className="w-4 h-4" />
              <MicOff className="w-4 h-4" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantsList;