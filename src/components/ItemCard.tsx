
import { useState } from "react";
import { Link } from "react-router-dom";

interface ItemCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  date: string;
  category: string;
  type: "lost" | "found";
}

export function ItemCard({ id, title, description, imageUrl, location, date, category, type }: ItemCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link to={`/item/${id}`}>
      <div 
        className={`item-card overflow-hidden card-hover ${isHovered ? 'ring-2 ring-opacity-50' : ''} ${type === 'lost' ? 'ring-lost-dark' : 'ring-found-dark'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden rounded-xl mb-3">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
          <div className={`absolute top-2 right-2 ${type === 'lost' ? 'bg-lost' : 'bg-found'} text-xs font-medium py-1 px-3 rounded-full`}>
            {type === 'lost' ? 'Lost' : 'Found'}
          </div>
        </div>
        
        <div className="p-2">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{title}</h3>
          <p className="text-gray-500 text-sm mb-2 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{location}</span>
            <span>{date}</span>
          </div>
          
          <div className="mt-3">
            <span className={`inline-block text-xs ${type === 'lost' ? 'bg-lost-light text-lost-dark' : 'bg-found-light text-found-dark'} rounded-full px-2 py-1`}>
              {category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
