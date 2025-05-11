
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OptimizationResult } from '@/components/dashboard/OptimizationResults';
import ResultsVisualizations from '@/components/results/ResultsVisualizations';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Calculate ROI in Rupees
  const roiInRupees = result ? Math.round(result.roi * 50000) : 0;
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('dyeOptimizerUser');
    if (!user) {
      navigate('/login');
      return;
    }
    setIsAuthenticated(true);
    
    // Get result from location state
    if (location.state?.result) {
      setResult(location.state.result);
    } else {
      // If no result in state, redirect back to dashboard
      navigate('/dashboard');
    }
  }, [location.state, navigate]);
  
  const handleSaveResults = () => {
    if (!result) return;
    
    // Get existing history or initialize empty array
    const existingHistory = JSON.parse(localStorage.getItem('dyeOptimizerHistory') || '[]');
    
    // Create new history entry
    const newEntry = {
      id: Date.now().toString(),
      parameters: location.state?.parameters || {
        fabricWeight: 100,
        machineType: 'jet',
        dyeType: 'reactive',
        temperature: 80,
        time: 60,
        waterRatio: 8,
        ph: 7,
        chemicalConcentration: 5,
      },
      result: result
    };
    
    // Add to history and save to localStorage
    const updatedHistory = [newEntry, ...existingHistory];
    localStorage.setItem('dyeOptimizerHistory', JSON.stringify(updatedHistory));
    
    toast({
      title: "Results Saved",
      description: "The optimization results have been saved to your history.",
    });
  };
  
  const handleBack = () => {
    navigate('/dashboard');
  };
  
  if (!isAuthenticated || !result) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button onClick={handleBack} variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <h1 className="text-3xl font-bold">Optimization Results</h1>
            </div>
            <Button onClick={handleSaveResults} className="bg-dye-primary hover:bg-dye-secondary">
              <Save className="mr-2 h-4 w-4" />
              Save Results
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card className="w-full animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-500">Optimized Dye Amount</p>
                  <p className="text-2xl font-bold text-dye-dark">{result.dyeAmount.toFixed(2)} g/kg</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm text-gray-500">Estimated ROI</p>
                  <p className="text-2xl font-bold text-green-700">₹{roiInRupees.toLocaleString('en-IN')}</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-gray-500">Success Likelihood</p>
                  <p className="text-2xl font-bold text-blue-700">{result.successScore}%</p>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="text-sm text-gray-500">Environmental Impact</p>
                  <p className="text-2xl font-bold text-amber-700">{result.environmentalImpact}%</p>
                </div>
              </CardContent>
            </Card>
            
            <ResultsVisualizations result={result} roiInRupees={roiInRupees} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Results;
