
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Cell,
  LineChart,
  Line,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { OptimizationResult } from '@/components/dashboard/OptimizationResults';

interface ResultsVisualizationsProps {
  result: OptimizationResult;
  roiInRupees: number;
}

const COLORS = ['#8B5CF6', '#6E59A5', '#9b87f5', '#7E69AB', '#33C3F0', '#D946EF'];

const ResultsVisualizations = ({ result, roiInRupees }: ResultsVisualizationsProps) => {
  // Prepare data for different chart types
  const pieData = [
    { name: 'Dye Amount', value: result.dyeAmount },
    { name: 'Success Score', value: result.successScore },
    { name: 'Environmental Impact', value: 100 - result.environmentalImpact },
  ];
  
  const barData = [
    { name: 'Dye Amount (g/kg)', value: result.dyeAmount },
    { name: 'ROI Factor', value: result.roi },
    { name: 'Success Score (%)', value: result.successScore },
    { name: 'Env. Impact (%)', value: result.environmentalImpact },
  ];

  const compareData = [
    { name: 'Standard Process', dyeAmount: result.dyeAmount * 1.4, roi: roiInRupees * 0.7, environmentalImpact: result.environmentalImpact * 1.3 },
    { name: 'Optimized Process', dyeAmount: result.dyeAmount, roi: roiInRupees, environmentalImpact: result.environmentalImpact }
  ];

  const radarData = [
    {
      subject: 'Dye Efficiency',
      A: 90,
      B: 70,
      fullMark: 100,
    },
    {
      subject: 'ROI',
      A: 85,
      B: 60,
      fullMark: 100,
    },
    {
      subject: 'Success Rate',
      A: result.successScore,
      B: result.successScore * 0.8,
      fullMark: 100,
    },
    {
      subject: 'Eco-Friendly',
      A: 100 - result.environmentalImpact,
      B: 80 - result.environmentalImpact,
      fullMark: 100,
    },
    {
      subject: 'Cost Saving',
      A: 80,
      B: 50,
      fullMark: 100,
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Comparative Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={compareData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="dyeAmount" name="Dye Amount (g/kg)" fill="#8B5CF6" />
                <Bar yAxisId="right" dataKey="roi" name="ROI (₹)" fill="#33C3F0" />
                <Bar yAxisId="left" dataKey="environmentalImpact" name="Environmental Impact (%)" fill="#D946EF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Parameter Distribution</CardTitle>
          </CardHeader>
          <CardContent>
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
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar name="Optimized Process" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                  <Radar name="Standard Process" dataKey="B" stroke="#D946EF" fill="#D946EF" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">ROI Analysis (₹)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Initial Investment', value: 25000 },
                  { name: 'Operating Cost', value: 10000 },
                  { name: 'Expected Return', value: roiInRupees },
                  { name: 'Net Profit', value: roiInRupees - 35000 },
                ]}
                margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                <Bar dataKey="value" fill="#33C3F0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsVisualizations;
