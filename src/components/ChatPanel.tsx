import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

interface ChatPanelProps {
  messages: any[];
  onSendMessage: (msg: string) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    onSendMessage(message);
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
        <div ref={messagesEndRef} />
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