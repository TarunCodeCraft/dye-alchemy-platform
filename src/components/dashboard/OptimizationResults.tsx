
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart,
  Pie,
  Cell
} from 'recharts';

export interface OptimizationResult {
  dyeAmount: number;
  roi: number;
  successScore: number;
  environmentalImpact: number;
  timestamp: string;
}

interface OptimizationResultsProps {
  result: OptimizationResult | null;
  onSave: () => void;
}

// Environmental impact color scale
const getEnvironmentalColor = (score: number) => {
  if (score < 30) return 'bg-green-500';
  if (score < 60) return 'bg-yellow-500';
  return 'bg-red-500';
};

// Success score color scale
const getSuccessColor = (score: number) => {
  if (score >= 70) return 'bg-green-500';
  if (score >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
};

const COLORS = ['#8B5CF6', '#6E59A5', '#9b87f5', '#7E69AB'];

const OptimizationResults = ({ result, onSave }: OptimizationResultsProps) => {
  if (!result) return null;

  const pieData = [
    { name: 'Dye Amount', value: result.dyeAmount },
    { name: 'ROI', value: result.roi * 10 },
    { name: 'Success Score', value: result.successScore },
    { name: 'Environmental Impact', value: 100 - result.environmentalImpact },
  ];
  
  const barData = [
    { name: 'Dye Amount (g/kg)', value: result.dyeAmount },
    { name: 'ROI (factor)', value: result.roi },
  ];

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Optimization Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Optimized Dye Amount</p>
                <p className="text-2xl font-bold text-dye-dark">{result.dyeAmount.toFixed(2)} g/kg</p>
              </div>
              <div className="h-12 w-12 bg-dye-primary text-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 17h6l2 2H7l2-2Z" />
                  <path d="M12 17V5l-2 2M12 5l2 2" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Estimated ROI</p>
                <p className="text-2xl font-bold text-dye-dark">{result.roi.toFixed(2)}x</p>
              </div>
              <div className="h-12 w-12 bg-green-500 text-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Success Likelihood</p>
                <p className="text-sm font-medium">{result.successScore}%</p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full rounded-full", getSuccessColor(result.successScore))} 
                  style={{ width: `${result.successScore}%` }} 
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Environmental Impact</p>
                <p className="text-sm font-medium">{result.environmentalImpact}%</p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full rounded-full", getEnvironmentalColor(result.environmentalImpact))} 
                  style={{ width: `${result.environmentalImpact}%` }} 
                />
              </div>
            </div>

            <Button onClick={onSave} className="w-full bg-dye-primary hover:bg-dye-secondary">
              Save Results
            </Button>
          </div>

          <div className="space-y-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OptimizationResults;
