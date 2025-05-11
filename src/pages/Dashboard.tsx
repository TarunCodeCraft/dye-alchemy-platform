
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/layout/Navbar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import OptimizationForm, { OptimizationData } from '@/components/dashboard/OptimizationForm';
import OptimizationResults, { OptimizationResult } from '@/components/dashboard/OptimizationResults';

// Mock function to simulate ML model prediction
const predictOptimization = (data: OptimizationData): OptimizationResult => {
  // Basic algorithm for demo purposes
  const baseAmount = data.fabricWeight * 0.1;
  
  // Adjust based on dye type
  const dyeTypeFactors = {
    'reactive': 1.2,
    'disperse': 0.9,
    'acid': 1.1,
    'vat': 1.5,
    'direct': 0.8
  };
  
  // Adjust based on machine type
  const machineTypeFactors = {
    'jet': 1.0,
    'jigger': 1.2,
    'padding': 0.7,
    'winch': 1.4,
    'beam': 0.9
  };
  
  const dyeType = data.dyeType as keyof typeof dyeTypeFactors;
  const machineType = data.machineType as keyof typeof machineTypeFactors;
  
  // Calculate simulated values
  let dyeAmount = baseAmount * dyeTypeFactors[dyeType] * machineTypeFactors[machineType];
  dyeAmount = dyeAmount * (1 + (data.temperature - 60) / 100);
  dyeAmount = dyeAmount * (1 - (data.waterRatio - 8) / 20);
  dyeAmount = Math.max(5, Math.min(50, dyeAmount)); // Keep between 5 and 50
  
  const roi = (100 - dyeAmount) / 20;
  
  const successScore = Math.min(
    98,
    60 + (data.temperature / 100) * 20 + (data.chemicalConcentration / 20) * 20
  );
  
  const environmentalImpact = Math.min(
    90,
    (dyeAmount / 50) * 50 + (data.waterRatio / 15) * 30 + (data.chemicalConcentration / 20) * 20
  );
  
  return {
    dyeAmount,
    roi,
    successScore,
    environmentalImpact,
    timestamp: new Date().toISOString(),
  };
};

const Dashboard = () => {
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
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
    }
  }, [navigate]);
  
  const handleOptimize = (data: OptimizationData) => {
    // Simulate delay for API call
    toast({
      title: "Processing",
      description: "Running optimization algorithm...",
    });
    
    setTimeout(() => {
      const result = predictOptimization(data);
      setOptimizationResult(result);
      
      toast({
        title: "Optimization Complete",
        description: "The optimized dye parameters have been calculated.",
      });
    }, 1500);
  };
  
  const handleSaveResults = () => {
    if (!optimizationResult) return;
    
    // Get existing history or initialize empty array
    const existingHistory = JSON.parse(localStorage.getItem('dyeOptimizerHistory') || '[]');
    
    // Create new history entry
    const newEntry = {
      id: Date.now().toString(),
      parameters: {
        fabricWeight: 100,
        machineType: 'jet',
        dyeType: 'reactive',
        temperature: 80,
        time: 60,
        waterRatio: 8,
        ph: 7,
        chemicalConcentration: 5,
      },
      result: optimizationResult
    };
    
    // Add to history and save to localStorage
    const updatedHistory = [newEntry, ...existingHistory];
    localStorage.setItem('dyeOptimizerHistory', JSON.stringify(updatedHistory));
    
    toast({
      title: "Results Saved",
      description: "The optimization results have been saved to your history.",
    });
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
          <h1 className="text-3xl font-bold mb-6">Optimization Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <OptimizationForm onSubmit={handleOptimize} />
            </div>
            <div>
              <OptimizationResults 
                result={optimizationResult} 
                onSave={handleSaveResults} 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
