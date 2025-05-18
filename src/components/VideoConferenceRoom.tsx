import { useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import Header from "./Header";
import VideoGrid from "./VideoGrid";
import SidePanel from "./SidePanel";
import ControlBar from "./ControlBar";
import ReactionsOverlay from "./ReactionsOverlay";
import { Reaction } from "../types";

// Default avatar URL
const defaultAvatar = "https://ui-avatars.com/api/?name=User&background=random";

// Shared participants array for grid and panel
const participants = [
  {
    id: 0,
    name: "You",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    isLocal: true,
  },
  {
    id: 1,
    name: "Catherine",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    id: 2,
    name: "Park Cho",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
  },
  { id: 3, name: "Alex", avatar: defaultAvatar },
  { id: 4, name: "Sophia", avatar: defaultAvatar },
  { id: 5, name: "Michael", avatar: defaultAvatar },
];

export default function VideoConferenceRoom() {
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [showReactionsPanel, setShowReactionsPanel] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [raisedHands, setRaisedHands] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [pinnedUser, setPinnedUser] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "Park Cho",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      message: "Hi Guys, Let's Discuss Our Project",
      time: "09:31 AM"
    },
    {
      id: 2,
      sender: "Catherine",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      message: "Sure, I'm very excited 🔥",
      time: "09:32 AM"
    },
    {
      id: 3,
      sender: "You",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      message: "Wohoo.. This is so Cool Guys! 😎",
      time: "09:33 AM"
    },
    {
      id: 4,
      sender: "Park Cho",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      message: "What are everyone's thoughts on the new design system?",
      time: "09:34 AM"
    },
    {
      id: 5,
      sender: "Catherine",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      message: "I think it looks great, but I have some concerns about the color palette.",
      time: "09:35 AM"
    }
  ]);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const sidePanelRef = useClickOutside<HTMLDivElement>(() => {
    setShowChat(false);
    setShowParticipants(false);
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

  // Chat send handler
  const handleSendMessage = (msg: string) => {
    if (!msg.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "You",
        avatar: participants[0].avatar,
        message: msg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Leave call handler
  const handleLeave = () => {
    setShowLeaveModal(true);
  };

  const confirmLeave = () => {
    // For demo, just reload page
    window.location.reload();
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
            participants={participants}
          />
        </main>

        <SidePanel 
          ref={sidePanelRef}
          showChat={showChat}
          showParticipants={showParticipants}
          setShowChat={setShowChat}
          setShowParticipants={setShowParticipants}
          participants={participants}
          chatMessages={chatMessages}
          onSendMessage={handleSendMessage}
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
        onLeave={handleLeave}
      />

      {/* Leave Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-2xl flex flex-col items-center">
            <span className="text-lg mb-4">Are you sure you want to leave the call?</span>
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => setShowLeaveModal(false)}>Cancel</button>
              <button className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600" onClick={confirmLeave}>Leave</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}