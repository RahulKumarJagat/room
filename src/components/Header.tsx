import React from "react";
import { Button } from "../ui/button";

const Header: React.FC = () => {
  return (
    <header className="p-3 sm:p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white bg-opacity-70 backdrop-blur-md shadow-md">
      <div className="mb-2 sm:mb-0">
        <h1 className="text-lg sm:text-xl font-bold truncate">Sprint Planning Project - Week 1</h1>
        <p className="text-xs sm:text-sm text-gray-500">Mindcare's Meeting Room</p>
      </div>
      <div className="flex gap-2 self-end sm:self-auto">
        <Button variant="destructive" size="sm" className="text-xs sm:text-sm">Reject</Button>
        <Button variant="default" size="sm" className="text-xs sm:text-sm">Accept</Button>
      </div>
    </header>
  );
};

export default Header;