import React from "react";
import { Reaction } from "../types";

interface ReactionsOverlayProps {
  reactions: Reaction[];
}

const ReactionsOverlay: React.FC<ReactionsOverlayProps> = ({ reactions }) => {
  return (
    <div className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2 text-xl sm:text-2xl pointer-events-none">
      {reactions.map((r) => (
        <span 
          key={r.id} 
          className="animate-float"
          style={{
            animationDelay: `${Math.random() * 0.5}s`
          }}
        >
          {r.emoji}
        </span>
      ))}
    </div>
  );
};

export default ReactionsOverlay;