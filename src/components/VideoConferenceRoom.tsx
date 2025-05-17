import React, { useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import Header from "./Header";
import VideoGrid from "./VideoGrid";
import SidePanel from "./SidePanel";
import ControlBar from "./ControlBar";
import ReactionsOverlay from "./ReactionsOverlay";
import { Reaction } from "../types";

export default function VideoConferenceRoom() {
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [showReactionsPanel, setShowReactionsPanel] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [raisedHands, setRaisedHands] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [pinnedUser, setPinnedUser] = useState<number | null>(null);
  
  const sidePanelRef = useClickOutside<HTMLDivElement>(() => {
    if (window.innerWidth < 768 && (showChat || showParticipants)) {
      setShowChat(false);
      setShowParticipants(false);
    }
  });

  const handleRaiseHand = () => {
    setRaisedHands((prev) => [...prev, "You"]);
    setTimeout(() => {
      setRaisedHands((prev) => prev.filter((name) => name !== "You"));
    }, 5000);
  };

  const handleReaction = (emoji: string) => {
    const newReaction = { emoji, id: Date.now() };
    setReactions((prev) => [...prev, newReaction]);
    setTimeout(() => {
      setReactions((prev) => prev.filter(r => r.id !== newReaction.id));
    }, 3000);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
    if (!showChat) setShowParticipants(false);
  };

  const toggleParticipants = () => {
    setShowParticipants(!showParticipants);
    if (!showParticipants) setShowChat(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800 relative overflow-hidden">
      <ReactionsOverlay reactions={reactions} />

      <Header />

      <div className="flex flex-1 relative overflow-hidden">
        <main className="flex-1 p-2 sm:p-4 overflow-y-auto glass-effect z-0 transition-all duration-300">
          <VideoGrid 
            presentationMode={presentationMode} 
            raisedHands={raisedHands}
            pinnedUser={pinnedUser}
            setPinnedUser={setPinnedUser}
          />
        </main>

        <SidePanel 
          ref={sidePanelRef}
          showChat={showChat}
          showParticipants={showParticipants}
          setShowChat={setShowChat}
          setShowParticipants={setShowParticipants}
        />
      </div>

      <ControlBar 
        isMuted={isMuted}
        toggleMute={toggleMute}
        presentationMode={presentationMode}
        setPresentationMode={setPresentationMode}
        toggleChat={toggleChat}
        toggleParticipants={toggleParticipants}
        handleRaiseHand={handleRaiseHand}
        showReactionsPanel={showReactionsPanel}
        setShowReactionsPanel={setShowReactionsPanel}
        handleReaction={handleReaction}
      />
    </div>
  );
}