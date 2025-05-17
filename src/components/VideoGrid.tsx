import React from "react";
import { Pin } from "lucide-react";

interface VideoGridProps {
  presentationMode: boolean;
  raisedHands: string[];
  pinnedUser: number | null;
  setPinnedUser: (index: number | null) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ 
  presentationMode, 
  raisedHands, 
  pinnedUser,
  setPinnedUser 
}) => {
  if (presentationMode) {
    return (
      <div className="flex items-center justify-center h-full glass-card rounded-xl">
        <h2 className="text-lg sm:text-xl text-gray-700">Presentation Mode Active</h2>
      </div>
    );
  }

  const participants = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    name: `User ${i + 1}`,
    image: i === 0 ? "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" :
           i === 1 ? "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" :
           i === 2 ? "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg" : undefined
  }));

  if (pinnedUser !== null) {
    const pinned = participants[pinnedUser];
    const others = participants.filter((_, i) => i !== pinnedUser);

    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-4 h-full">
        <div className="col-span-3 relative glass-card rounded-xl overflow-hidden">
          <img 
            src={pinned.image} 
            alt={pinned.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 glass-effect px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-sm font-medium">{pinned.name}</span>
            <button 
              onClick={() => setPinnedUser(null)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <Pin className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
          {others.slice(0, 3).map((participant) => (
            <div 
              key={participant.id}
              className="relative glass-card rounded-xl aspect-video flex items-center justify-center overflow-hidden"
            >
              {participant.image ? (
                <img 
                  src={participant.image} 
                  alt={participant.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-600 text-sm">{participant.name}</span>
              )}
              <button 
                onClick={() => setPinnedUser(participant.id)}
                className="absolute top-2 right-2 glass-effect p-1.5 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Pin className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
      {participants.map((participant) => (
        <div
          key={participant.id}
          className="relative glass-card rounded-xl aspect-video flex items-center justify-center overflow-hidden group"
        >
          {participant.image ? (
            <img 
              src={participant.image} 
              alt={participant.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-600 text-sm">{participant.name}</span>
          )}
          <div className="absolute bottom-2 left-2 glass-effect px-2 py-1 text-xs sm:text-sm rounded-lg">
            {participant.name}
          </div>
          <button 
            onClick={() => setPinnedUser(participant.id)}
            className="absolute top-2 right-2 glass-effect p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/30 transition-all duration-200"
          >
            <Pin className="w-3 h-3" />
          </button>
          {raisedHands.includes(participant.name) && (
            <span className="absolute top-2 right-2 glass-effect px-2 py-1 text-xs rounded-lg animate-pulse">
              ✋
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;