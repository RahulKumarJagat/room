import React, { forwardRef } from "react";
import ParticipantsList from "./ParticipantsList";
import ChatPanel from "./ChatPanel";

interface SidePanelProps {
  showChat: boolean;
  showParticipants: boolean;
  setShowChat: (show: boolean) => void;
  setShowParticipants: (show: boolean) => void;
}

const SidePanel = forwardRef<HTMLDivElement, SidePanelProps>(
  ({ showChat, showParticipants, setShowChat, setShowParticipants }, ref) => {
    const isOpen = showChat || showParticipants;
    
    return (
      <aside 
        ref={ref}
        className={`absolute md:relative right-0 top-0 h-full w-5/6 sm:w-2/3 md:w-1/3 lg:w-1/4 border-l p-3 sm:p-4 flex flex-col bg-white bg-opacity-95 backdrop-blur-md z-10 shadow-lg 
          transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0 md:w-0 md:p-0 md:border-l-0'}`}
      >
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-lg font-semibold">
            {showParticipants ? "Participants" : "Chat"}
          </h2>
          <button 
            onClick={() => showParticipants ? setShowParticipants(false) : setShowChat(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        {showParticipants && <ParticipantsList />}
        {showChat && <ChatPanel />}
      </aside>
    );
  }
);

SidePanel.displayName = "SidePanel";

export default SidePanel;