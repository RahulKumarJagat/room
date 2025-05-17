import React, { useState } from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

const ChatPanel: React.FC = () => {
  const [message, setMessage] = useState("");
  
  const messages = [
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
  ];
  
  const handleSendMessage = () => {
    if (message.trim() === "") return;
    // Would handle sending message here
    setMessage("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Remove or comment out the heading below */}
      {/* <div className="mb-4 pb-3 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Chat</h2>
      </div> */}

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === "You" ? "flex-row-reverse" : ""
            }`}
          >
            <img
              src={msg.avatar}
              alt={msg.sender}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div
              className={`flex-1 ${
                msg.sender === "You" ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {msg.sender}
                </span>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
              <div
                className={`p-3 rounded-lg max-w-[85%] inline-block ${
                  msg.sender === "You"
                    ? "bg-blue-500 text-white ml-auto"
                    : "glass-card"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-auto">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2.5 rounded-lg glass-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button 
          variant="default" 
          size="sm"
          onClick={handleSendMessage}
          className="aspect-square"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatPanel;