
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { SearchFilters } from "@/components/SearchFilters";
import { ItemCard } from "@/components/ItemCard";

// Import the same mock data used in Index.tsx
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

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    dateFrom: "",
    dateTo: "",
    type: "all"
  });
  
  const [filteredItems, setFilteredItems] = useState(mockItems);
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  
  useEffect(() => {
    setIsSearching(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const results = mockItems.filter(item => {
        // Apply search query filter
        if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
            !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Apply category filter
        if (filters.category && item.category !== filters.category) {
          return false;
        }
        
        // Apply location filter
        if (filters.location && item.location !== filters.location) {
          return false;
        }
        
        // Apply date range filter
        if (filters.dateFrom && new Date(item.date) < new Date(filters.dateFrom)) {
          return false;
        }
        
        if (filters.dateTo && new Date(item.date) > new Date(filters.dateTo)) {
          return false;
        }
        
        // Apply type filter
        if (filters.type !== "all" && item.type !== filters.type) {
          return false;
        }
        
        return true;
      });
      
      setFilteredItems(results);
      setNoResults(results.length === 0);
      setIsSearching(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery, filters]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Lost & Found Items</h1>
          <p className="text-gray-600">
            Use the search bar and filters below to find specific items.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <SearchFilters 
            onSearch={handleSearch} 
            onFilterChange={handleFilterChange} 
          />
          
          {isSearching ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Searching for items...</p>
            </div>
          ) : noResults ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-md">
              <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-medium mb-2">No Items Found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any items matching your search criteria. Try adjusting your filters or search with a different keyword.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-500">
                Found {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <ItemCard key={item.id} {...item} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
