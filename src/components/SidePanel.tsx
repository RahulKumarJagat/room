import { forwardRef } from "react";
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
        className={`
          fixed md:static
          right-2 md:right-0 top-2 md:top-0 h-[calc(100%-2rem)] md:h-full
          w-5/6 sm:w-2/3 md:w-80
          border-l md:border-l-0 p-3 sm:p-4 flex flex-col
          glass-effect rounded-2xl md:rounded-none shadow-2xl
          z-20
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          md:translate-x-0
          bg-white/80
          backdrop-blur-lg
        `}
        style={{ minWidth: '18rem', maxWidth: '100vw' }}
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
        
        {/* Always show one panel on desktop, or the open one on mobile */}
        {(showParticipants || (typeof window !== "undefined" && window.innerWidth >= 768 && !showChat)) && <ParticipantsList />}
        {(showChat || (typeof window !== "undefined" && window.innerWidth >= 768 && !showParticipants)) && <ChatPanel />}
      </aside>
    );
  }
);

SidePanel.displayName = "SidePanel";

export default SidePanel;