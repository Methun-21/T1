
import { Search, ArrowDown } from "lucide-react";
import { useState } from "react";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

export function SearchFilters({ onSearch, onFilterChange }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    dateFrom: "",
    dateTo: "",
    type: "all"
  });
  
  const categories = [
    "Electronics", "Clothing", "Accessories", "Documents", "Keys", "Bags", "Other"
  ];
  
  const locations = [
    "Campus Center", "Library", "Cafeteria", "Gym", "Dormitory", "Parking Lot", "Other"
  ];
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for lost or found items..."
            className="input-field w-full pr-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
      
      <div className="mt-4">
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 hover:text-primary"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>Advanced Filters</span>
          <ArrowDown size={16} className={`ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                className="input-field w-full"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                name="location"
                className="input-field w-full"
                value={filters.location}
                onChange={handleFilterChange}
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
              <input
                type="date"
                name="dateFrom"
                className="input-field w-full"
                value={filters.dateFrom}
                onChange={handleFilterChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
              <input
                type="date"
                name="dateTo"
                className="input-field w-full"
                value={filters.dateTo}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="md:col-span-2 lg:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="all"
                    checked={filters.type === "all"}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <span>All</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="lost"
                    checked={filters.type === "lost"}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <span>Lost</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="found"
                    checked={filters.type === "found"}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <span>Found</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
