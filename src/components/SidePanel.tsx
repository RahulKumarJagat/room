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
    
    if (!isOpen) {
      return null;
    }
    
    return (
      <aside 
        ref={ref}
        className="absolute md:static right-0 top-0 h-full w-5/6 sm:w-2/3 md:w-1/4 border-l p-3 sm:p-4 flex flex-col bg-white bg-opacity-95 backdrop-blur-md z-10 shadow-lg"
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