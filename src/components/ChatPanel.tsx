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
    <div className="flex flex-col flex-1 h-full max-h-full">
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1 sm:space-y-4 sm:mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 sm:gap-3 ${
              msg.sender === "You" ? "flex-row-reverse" : ""
            }`}
          >
            <img
              src={msg.avatar}
              alt={msg.sender}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
            />
            <div
              className={`flex-1 flex flex-col ${
                msg.sender === "You" ? "items-end text-right" : "items-start text-left"
              }`}
            >
              <div className="flex items-center gap-1 sm:gap-2 mb-0.5">
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  {msg.sender}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500">
                  {msg.time}
                </span>
              </div>
              <div
                className={`p-2 sm:p-3 rounded-lg max-w-[85vw] sm:max-w-[85%] inline-block break-words ${
                  msg.sender === "You"
                    ? "bg-blue-500 text-white ml-auto"
                    : "glass-card"
                }`}
              >
                <p className="text-xs sm:text-sm">{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex flex-col gap-2 mt-auto sm:flex-row">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 sm:p-2.5 rounded-lg glass-card text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="default"
          size="sm"
          onClick={handleSendMessage}
          className="aspect-square w-9 h-9 sm:w-auto sm:h-auto"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatPanel;