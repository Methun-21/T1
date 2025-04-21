
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ChatInterface } from "@/components/ChatInterface";

// Sample initial messages for demo
const sampleMessages = [
  {
    id: 1,
    content: "Hi, I saw your post about the AirPods you found.",
    sender: "user" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  {
    id: 2,
    content: "Yes, I found them near the library entrance. Can you describe them?",
    sender: "other" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.8) // 1.8 hours ago
  },
  {
    id: 3,
    content: "They're white AirPods Pro with a small scratch on the case. I lost them yesterday after my study session.",
    sender: "user" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.7) // 1.7 hours ago
  },
  {
    id: 4,
    content: "That matches what I found. Do you have any proof they're yours?",
    sender: "other" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5) // 1.5 hours ago
  },
  {
    id: 5,
    content: "Yes, I can show you the original receipt and the serial number should match my Apple account.",
    sender: "user" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.4) // 1.4 hours ago
  },
  {
    id: 6,
    content: "Great! When would you be available to meet and verify?",
    sender: "other" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.2) // 1.2 hours ago
  }
];

// Mock data for item owners from ItemDetail
const itemOwners = [
  {
    id: 1,
    name: "Michael Chen",
  },
  {
    id: 2,
    name: "Sarah Johnson",
  },
  {
    id: 3,
    name: "Emily Davis",
  },
  {
    id: 4,
    name: "James Wilson",
  },
  {
    id: 5,
    name: "Amanda Lee",
  },
  {
    id: 6,
    name: "Daniel Brown",
  },
];

export default function Chat() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState(sampleMessages);
  const [recipient, setRecipient] = useState<{name: string, avatar?: string} | null>(null);
  
  useEffect(() => {
    // Simulate API call to fetch chat history and recipient details
    setIsLoading(true);
    
    setTimeout(() => {
      const owner = itemOwners.find(owner => owner.id === Number(id));
      
      if (owner) {
        setRecipient({
          name: owner.name,
        });
      }
      
      setIsLoading(false);
    }, 800);
  }, [id]);
  
  const handleSendMessage = (message: string) => {
    // In a real app, this would send the message to the backend
    console.log("Sending message:", message);
    
    // Simulate receiving a response after a delay
    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        content: "Thanks for your message. I'll get back to you shortly.",
        sender: "other" as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
    }, 2000);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
  if (!recipient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">😕</span>
            </div>
            <h1 className="text-2xl font-bold mb-4">Chat Not Found</h1>
            <p className="text-gray-600 mb-6">
              This chat doesn't exist or you don't have permission to access it.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <ChatInterface
            recipientName={recipient.name}
            recipientAvatar={recipient.avatar}
            initialMessages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
