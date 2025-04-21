
import { useState } from "react";
import { Plus, Image } from "lucide-react";

interface ReportFormProps {
  type: "lost" | "found";
  onSubmit: (data: any) => void;
  onTypeChange: (type: "lost" | "found") => void;
}

export function ReportForm({ type, onSubmit, onTypeChange }: ReportFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    location: "",
    image: null as File | null
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const categories = [
    "Electronics", "Clothing", "Accessories", "Documents", "Keys", "Bags", "Other"
  ];
  
  const locations = [
    "Campus Center", "Library", "Cafeteria", "Gym", "Dormitory", "Parking Lot", "Other"
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
      
      if (errors.image) {
        setErrors({ ...errors, image: "" });
      }
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = "Item name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.image) newErrors.image = "Image is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-full overflow-hidden p-1 bg-gray-100">
          <button
            className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${type === 'lost' ? 'bg-lost text-lost-dark' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => onTypeChange("lost")}
          >
            Lost an Item
          </button>
          <button
            className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${type === 'found' ? 'bg-found text-found-dark' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => onTypeChange("found")}
          >
            Found an Item
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
          <div 
            className={`border-2 border-dashed rounded-2xl h-48 flex items-center justify-center cursor-pointer overflow-hidden ${errors.image ? 'border-red-300' : 'border-gray-300'}`}
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4">
                <Image className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">Click to upload image</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
            <input
              type="text"
              name="title"
              className={`input-field w-full ${errors.title ? 'border-red-300 focus:ring-red-500' : ''}`}
              placeholder="e.g. Blue Backpack"
              value={formData.title}
              onChange={handleInputChange}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              className={`input-field w-full ${errors.category ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              name="date"
              className={`input-field w-full ${errors.date ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={formData.date}
              onChange={handleInputChange}
            />
            {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              name="location"
              className={`input-field w-full ${errors.location ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={formData.location}
              onChange={handleInputChange}
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            rows={4}
            className={`input-field w-full ${errors.description ? 'border-red-300 focus:ring-red-500' : ''}`}
            placeholder="Provide details about the item..."
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>
        
        <div className="flex justify-end">
          <button type="submit" className={`btn-primary ${type === 'lost' ? 'bg-lost-dark' : 'bg-found-dark'}`}>
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}
