
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
}

interface ChatInterfaceProps {
  recipientName: string;
  recipientAvatar?: string;
  initialMessages?: Message[];
  onSendMessage: (message: string) => void;
}

export function ChatInterface({ 
  recipientName, 
  recipientAvatar,
  initialMessages = [],
  onSendMessage 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        content: newMessage,
        sender: "user",
        timestamp: new Date()
      };
      
      setMessages([...messages, message]);
      setNewMessage("");
      onSendMessage(newMessage);
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="bg-white border-b p-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-purple-light flex items-center justify-center mr-3">
          {recipientAvatar ? (
            <img src={recipientAvatar} alt={recipientName} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-purple-dark font-medium">{recipientName.charAt(0)}</span>
          )}
        </div>
        <div>
          <h3 className="font-medium">{recipientName}</h3>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === "user" 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-gray-200 text-gray-800 rounded-tl-none"
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${message.sender === "user" ? "text-primary-foreground/70" : "text-gray-500"}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t p-4 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 input-field"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button 
            type="submit" 
            className="ml-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white"
            disabled={!newMessage.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
