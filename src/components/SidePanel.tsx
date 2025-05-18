import React, { forwardRef } from "react";
import ParticipantsList from "./ParticipantsList";
import ChatPanel from "./ChatPanel";

interface SidePanelProps {
  showChat: boolean;
  showParticipants: boolean;
  setShowChat: (show: boolean) => void;
  setShowParticipants: (show: boolean) => void;
  participants: any[];
  chatMessages: any[];
  onSendMessage: (msg: string) => void;
}

const SidePanel = forwardRef<HTMLDivElement, SidePanelProps>(
  (
    {
      showChat,
      showParticipants,
      setShowChat,
      setShowParticipants,
      participants,
      chatMessages,
      onSendMessage,
    },
    ref
  ) => {
    const isOpen = showChat || showParticipants;

    return (
      <aside
        ref={ref}
        tabIndex={-1}
        aria-modal={isOpen}
        className={`
          fixed
          right-2 top-2 h-[calc(100%-2rem)]
          w-5/6 sm:w-2/3 md:w-80
          border-l p-3 sm:p-4 flex flex-col
          glass-effect rounded-2xl shadow-2xl
          z-20
          transition-transform duration-300
          bg-white/80
          backdrop-blur-lg
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ minWidth: "18rem", maxWidth: "100vw" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {showParticipants ? "Participants" : showChat ? "Chat" : ""}
          </h2>
          <button
            onClick={() => {
              if (showParticipants) setShowParticipants(false);
              if (showChat) setShowChat(false);
            }}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close panel"
          >
            ×
          </button>
        </div>
        {showParticipants && <ParticipantsList participants={participants} />}
        {showChat && (
          <ChatPanel messages={chatMessages} onSendMessage={onSendMessage} />
        )}
      </aside>
    );
  }
);

SidePanel.displayName = "SidePanel";

export default SidePanel;