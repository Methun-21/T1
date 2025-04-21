
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ItemCard } from "@/components/ItemCard";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useNotification } from "@/components/NotificationToast";

// Mock data for demonstration
const mockItems = [
  {
    id: 1,
    title: "Apple AirPods Pro",
    description: "White AirPods Pro with case. Found near the library entrance.",
    imageUrl: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=683&q=80",
    location: "Library",
    date: "2023-06-15",
    category: "Electronics",
    type: "found" as const
  },
  {
    id: 2,
    title: "Blue Backpack",
    description: "Lost my blue North Face backpack with laptop and textbooks inside.",
    imageUrl: "https://images.unsplash.com/photo-1576429862996-c4c3fa079064?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    location: "Campus Center",
    date: "2023-06-12",
    category: "Bags",
    type: "lost" as const
  },
  {
    id: 3,
    title: "Student ID Card",
    description: "Found a student ID card for John Smith near the cafeteria.",
    imageUrl: "https://images.unsplash.com/photo-1590272456521-1bbe160a18ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    location: "Cafeteria",
    date: "2023-06-14",
    category: "Documents",
    type: "found" as const
  },
  {
    id: 4,
    title: "Car Keys with Red Keychain",
    description: "Lost my car keys with a distinctive red keychain attached.",
    imageUrl: "https://images.unsplash.com/photo-1544072146-11d898d323f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    location: "Parking Lot",
    date: "2023-06-13",
    category: "Keys",
    type: "lost" as const
  },
  {
    id: 5,
    title: "Gold Necklace",
    description: "Found a gold necklace with a heart pendant in the gym.",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    location: "Gym",
    date: "2023-06-11",
    category: "Accessories",
    type: "found" as const
  },
  {
    id: 6,
    title: "Black Wallet",
    description: "Lost my black leather wallet with ID and credit cards.",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    location: "Campus Center",
    date: "2023-06-10",
    category: "Accessories",
    type: "lost" as const
  }
];

export default function Index() {
  const [activeType, setActiveType] = useState<"all" | "lost" | "found">("all");
  const { addNotification } = useNotification();
  
  useEffect(() => {
    // Show a welcome notification when the page loads
    const timer = setTimeout(() => {
      addNotification({
        title: "Welcome to FindFlow",
        message: "Your lost items are just a search away!",
        type: "info",
        duration: 5000
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [addNotification]);
  
  const filteredItems = activeType === "all" 
    ? mockItems 
    : mockItems.filter(item => item.type === activeType);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent">
            Lost Something? Found Something?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            FindFlow helps connect people who have lost items with those who have found them.
            Browse the latest reports or create your own.
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full overflow-hidden p-1 bg-gray-100 shadow-sm">
            <button
              className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${activeType === 'all' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveType("all")}
            >
              All Items
            </button>
            <button
              className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${activeType === 'lost' ? 'bg-lost text-lost-dark' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveType("lost")}
            >
              Lost Items
            </button>
            <button
              className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${activeType === 'found' ? 'bg-found text-found-dark' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveType("found")}
            >
              Found Items
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map(item => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
        
        <div className="flex justify-center">
          <Link to="/report" className="btn-primary flex items-center space-x-2 group">
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Report an Item</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
