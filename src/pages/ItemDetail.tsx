
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { MessageCircle, ArrowLeft, MapPin, Calendar } from "lucide-react";

// Same mock data as in other components
const mockItems = [
  {
    id: 1,
    title: "Apple AirPods Pro",
    description: "White AirPods Pro with case. Found near the library entrance. The earbuds were in their case, and the case was slightly scratched. If these are yours, please be ready to describe any identifying marks or provide proof of purchase.",
    imageUrl: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=683&q=80",
    location: "Library",
    date: "2023-06-15",
    category: "Electronics",
    type: "found" as const,
    reportedBy: {
      name: "Michael Chen",
      contact: "michaelc@example.com"
    }
  },
  {
    id: 2,
    title: "Blue Backpack",
    description: "Lost my blue North Face backpack with laptop and textbooks inside. Last seen in the Campus Center near the cafeteria. It contains important study materials and a MacBook Air. There's also a small keychain with a mountain design attached to the zipper. Any information would be greatly appreciated.",
    imageUrl: "https://images.unsplash.com/photo-1576429862996-c4c3fa079064?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    location: "Campus Center",
    date: "2023-06-12",
    category: "Bags",
    type: "lost" as const,
    reportedBy: {
      name: "Sarah Johnson",
      contact: "sarahj@example.com"
    }
  },
  {
    id: 3,
    title: "Student ID Card",
    description: "Found a student ID card for John Smith near the cafeteria. The ID card has been turned in to the campus security office. If this is your card, please bring another form of identification to claim it.",
    imageUrl: "https://images.unsplash.com/photo-1590272456521-1bbe160a18ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    location: "Cafeteria",
    date: "2023-06-14",
    category: "Documents",
    type: "found" as const,
    reportedBy: {
      name: "Emily Davis",
      contact: "emilyd@example.com"
    }
  },
  {
    id: 4,
    title: "Car Keys with Red Keychain",
    description: "Lost my car keys with a distinctive red keychain attached. The keychain has a small Swiss Army knife tool on it and there are two car keys (Toyota) and one house key. Lost somewhere between the Parking Lot and the Science Building.",
    imageUrl: "https://images.unsplash.com/photo-1544072146-11d898d323f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    location: "Parking Lot",
    date: "2023-06-13",
    category: "Keys",
    type: "lost" as const,
    reportedBy: {
      name: "James Wilson",
      contact: "jamesw@example.com"
    }
  },
  {
    id: 5,
    title: "Gold Necklace",
    description: "Found a gold necklace with a heart pendant in the gym. The pendant has a small diamond in the center and the chain appears to be 14k gold. It was found near the weight section. It's been handed to the gym reception desk for safekeeping.",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    location: "Gym",
    date: "2023-06-11",
    category: "Accessories",
    type: "found" as const,
    reportedBy: {
      name: "Amanda Lee",
      contact: "amandal@example.com"
    }
  },
  {
    id: 6,
    title: "Black Wallet",
    description: "Lost my black leather wallet with ID and credit cards. The wallet is a bifold Fossil brand with my student ID, driver's license, and two credit cards. There might also be about $30 in cash. Last seen at the Campus Center food court.",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    location: "Campus Center",
    date: "2023-06-10",
    category: "Accessories",
    type: "lost" as const,
    reportedBy: {
      name: "Daniel Brown",
      contact: "danielb@example.com"
    }
  }
];

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<typeof mockItems[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch item details
    setIsLoading(true);
    
    setTimeout(() => {
      const foundItem = mockItems.find(item => item.id === Number(id));
      setItem(foundItem || null);
      setIsLoading(false);
    }, 800);
  }, [id]);
  
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
  
  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">😕</span>
            </div>
            <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
            <p className="text-gray-600 mb-6">
              The item you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/" className="btn-primary">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors">
            <ArrowLeft size={18} className="mr-1" />
            <span>Back to listings</span>
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 md:p-8">
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  item.type === "lost" ? "bg-lost text-lost-dark" : "bg-found text-found-dark"
                }`}
              >
                {item.type === "lost" ? "Lost Item" : "Found Item"}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h1>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-medium">{item.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar size={18} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <p className="font-medium">{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{item.description}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Category</h2>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  item.type === "lost" ? "bg-lost-light text-lost-dark" : "bg-found-light text-found-dark"
                }`}>
                  {item.category}
                </span>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Reported By</h2>
                <p className="text-gray-700">{item.reportedBy.name}</p>
              </div>
              
              <Link to={`/chat/${id}`} className="btn-primary flex items-center justify-center w-full">
                <MessageCircle size={18} className="mr-2" />
                <span>Contact {item.type === "lost" ? "Owner" : "Finder"}</span>
              </Link>
            </div>
            
            <div className="bg-gray-100 h-full flex items-center justify-center p-4">
              <div className="h-full max-h-[500px] w-full rounded-xl overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
