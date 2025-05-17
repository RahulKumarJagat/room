import React, { useState, useEffect } from "react";
import { 
  Mic, MicOff, Video, ScreenShare, PhoneOff, Settings,
  MessageSquare, Users, Layout, HandMetal, Smile, MoreHorizontal
} from "lucide-react";
import { Button } from "../ui/button";

interface ControlBarProps {
  isMuted: boolean;
  toggleMute: () => void;
  presentationMode: boolean;
  setPresentationMode: (mode: boolean) => void;
  toggleChat: () => void;
  toggleParticipants: () => void;
  handleRaiseHand: () => void;
  showReactionsPanel: boolean;
  setShowReactionsPanel: (show: boolean) => void;
  handleReaction: (emoji: string) => void;
}

const ControlBar: React.FC<ControlBarProps> = ({
  isMuted,
  toggleMute,
  presentationMode,
  setPresentationMode,
  toggleChat,
  toggleParticipants,
  handleRaiseHand,
  showReactionsPanel,
  setShowReactionsPanel,
  handleReaction
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Update isMobile state based on window width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const primaryControls = (
    <>
      <Button 
        variant="outline" 
        onClick={toggleMute} 
        title="Mute / Unmute"
        className="transition-all duration-200 hover:bg-gray-100"
      >
        {isMuted ? <MicOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Mic className="w-4 h-4 sm:w-5 sm:h-5" />}
      </Button>
      
      <Button 
        variant="outline" 
        title="Toggle Video"
        className="transition-all duration-200 hover:bg-gray-100"
      >
        <Video className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
      
      <Button 
        variant="destructive" 
        title="Leave Call"
        className="transition-all duration-200"
      >
        <PhoneOff className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
    </>
  );
  
  const secondaryControls = (
    <>
      <Button 
        variant="outline" 
        onClick={() => setPresentationMode(!presentationMode)} 
        title="Toggle Presentation Mode"
        className="transition-all duration-200 hover:bg-gray-100"
      >
        <Layout className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
      
      <Button 
        variant="outline" 
        title="Share Screen"
        className="transition-all duration-200 hover:bg-gray-100"
      >
        <ScreenShare className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
      
      <Button 
        variant="outline" 
        title="Settings"
        className="transition-all duration-200 hover:bg-gray-100"
      >
        <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
      
      <Button 
        variant="outline" 
        onClick={toggleParticipants} 
        title="Participants"
        className="transition-all duration-200 hover:bg-gray-100"
      >
        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
      
      <Button 
        variant="outline" 
        onClick={toggleChat} 
        title="Chat"
        className="transition-all duration-200 hover:bg-gray-100"
      >
        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
      
      <Button 
        variant="outline" 
        onClick={handleRaiseHand} 
        title="Raise Hand"
        className="transition-all duration-200 hover:bg-gray-100"
      >
        <HandMetal className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
      
      <div className="relative">
        <Button 
          variant="outline" 
          onClick={() => setShowReactionsPanel(!showReactionsPanel)} 
          title="Reactions"
          className="transition-all duration-200 hover:bg-gray-100"
        >
          <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        
        {showReactionsPanel && (
          <div className="absolute bottom-full mb-2 right-0 bg-white p-2 rounded shadow-md flex gap-2 z-20">
            <button onClick={() => handleReaction("🎉")} className="text-xl hover:scale-110 transition-transform">🎉</button>
            <button onClick={() => handleReaction("👍")} className="text-xl hover:scale-110 transition-transform">👍</button>
            <button onClick={() => handleReaction("😂")} className="text-xl hover:scale-110 transition-transform">😂</button>
            <button onClick={() => handleReaction("❤️")} className="text-xl hover:scale-110 transition-transform">❤️</button>
          </div>
        )}
      </div>
    </>
  );
  
  return (
    <footer className="py-2 px-3 sm:py-4 sm:px-4 border-t bg-white bg-opacity-70 backdrop-blur-md shadow-inner">
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
        {primaryControls}
        
        {isMobile ? (
          <div className="relative">
            <Button 
              variant="outline" 
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="transition-all duration-200 hover:bg-gray-100"
            >
              <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            
            {showMoreMenu && (
              <div className="absolute bottom-full right-0 mb-2 bg-white p-2 rounded shadow-md grid grid-cols-3 gap-2 z-20">
                {secondaryControls}
              </div>
            )}
          </div>
        ) : (
          secondaryControls
        )}
      </div>
    </footer>
  );
};

export default ControlBar;