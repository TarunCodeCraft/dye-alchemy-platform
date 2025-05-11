
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/layout/Navbar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import HistoryTable from '@/components/history/HistoryTable';

const History = () => {
  const [history, setHistory] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('dyeOptimizerUser');
    if (!user) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
      
      // Load optimization history
      const savedHistory = JSON.parse(localStorage.getItem('dyeOptimizerHistory') || '[]');
      setHistory(savedHistory);
    }
  }, [navigate]);
  
  const handleExport = () => {
    // In a real app, this would generate a CSV or Excel file
    toast({
      title: "Export Started",
      description: "Your data is being prepared for download.",
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "In a real app, this would download a file.",
      });
    }, 1500);
  };
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-3xl font-bold mb-6">Optimization History</h1>
          <HistoryTable history={history} onExport={handleExport} />
        </main>
      </div>
    </div>
  );
};

export default History;
