
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ReportForm } from "@/components/ReportForm";
import { NotificationToast } from "@/components/NotificationToast";
import { useNavigate } from "react-router-dom";

export default function Report() {
  const [reportType, setReportType] = useState<"lost" | "found">("lost");
  const [notification, setNotification] = useState<{
    show: boolean;
    id: string;
    title: string;
    message: string;
    type: "success" | "error";
  } | null>(null);
  
  const navigate = useNavigate();
  
  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data);
    
    // Simulate API call to backend
    setTimeout(() => {
      setNotification({
        show: true,
        id: Date.now().toString(),
        title: `${reportType === 'lost' ? 'Lost' : 'Found'} Report Submitted`,
        message: "Your report has been successfully submitted and will be reviewed shortly.",
        type: "success"
      });
      
      // Redirect to home after notification
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 1000);
  };
  
  const closeNotification = () => {
    setNotification(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Report an Item</h1>
          <p className="text-gray-600">
            Fill out the form below to report a lost or found item.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ReportForm 
            type={reportType} 
            onTypeChange={setReportType} 
            onSubmit={handleSubmit} 
          />
        </div>
      </div>
      
      {notification && notification.show && (
        <NotificationToast
          id={notification.id}
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}
