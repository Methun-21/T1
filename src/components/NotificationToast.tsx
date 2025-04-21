
import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";

interface NotificationToastProps {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error" | "match";
  duration?: number;
  onClose: (id: string) => void;
}

export function NotificationToast({ 
  id, 
  title, 
  message, 
  type = "info", 
  duration = 5000,
  onClose 
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); // Wait for exit animation
    }, duration);
    
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);
  
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-found-light border-found-dark";
      case "warning":
        return "bg-lost-light border-lost";
      case "error":
        return "bg-red-100 border-red-400";
      case "match":
        return "bg-purple-light border-purple";
      default:
        return "bg-blue-light border-blue";
    }
  };
  
  const getIcon = () => {
    switch (type) {
      case "match":
        return <Bell className="text-purple" />;
      default:
        return <Bell className="text-gray-600" />;
    }
  };
  
  return (
    <div 
      className={`${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } fixed bottom-4 right-4 z-50 w-80 transform transition-all duration-300 ease-in-out rounded-lg border-l-4 ${getTypeStyles()} shadow-lg`}
    >
      <div className="p-4 relative">
        <button 
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(id), 300);
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            {getIcon()}
          </div>
          <div>
            <h4 className="text-sm font-medium">{title}</h4>
            <p className="text-xs text-gray-600 mt-1">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<
    Array<Omit<NotificationToastProps, "onClose"> & { id: string }>
  >([]);
  
  const addNotification = (notification: Omit<NotificationToastProps, "id" | "onClose">) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { ...notification, id }]);
    return id;
  };
  
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };
  
  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-4">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            {...notification}
            onClose={removeNotification}
          />
        ))}
      </div>
    </>
  );
}

// Context hook for using notifications
import { createContext, useContext } from "react";

type NotificationContextType = {
  addNotification: (notification: Omit<NotificationToastProps, "id" | "onClose">) => string;
  removeNotification: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

export function NotificationContextProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<
    Array<Omit<NotificationToastProps, "onClose"> & { id: string }>
  >([]);
  
  const addNotification = (notification: Omit<NotificationToastProps, "id" | "onClose">) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { ...notification, id }]);
    return id;
  };
  
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };
  
  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-4">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            {...notification}
            onClose={removeNotification}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}
