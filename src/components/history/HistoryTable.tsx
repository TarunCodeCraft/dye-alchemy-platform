
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { OptimizationResult } from '../dashboard/OptimizationResults';
import { OptimizationData } from '../dashboard/OptimizationForm';

interface HistoryRecord {
  id: string;
  parameters: OptimizationData;
  result: OptimizationResult;
}

interface HistoryTableProps {
  history: HistoryRecord[];
  onExport: () => void;
}

const HistoryTable = ({ history, onExport }: HistoryTableProps) => {
  const [view, setView] = useState<'table' | 'chart'>('table');

  // Transform history data for charts
  const chartData = history.map((record) => ({
    id: record.id,
    time: new Date(record.result.timestamp).toLocaleDateString(),
    dyeAmount: record.result.dyeAmount,
    roi: record.result.roi,
    successScore: record.result.successScore,
    environmentalImpact: record.result.environmentalImpact,
  }));

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Optimization History</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex rounded-md overflow-hidden">
            <Button
              variant={view === 'table' ? 'default' : 'outline'}
              className={view === 'table' ? 'bg-dye-primary hover:bg-dye-secondary' : ''}
              onClick={() => setView('table')}
              size="sm"
            >
              Table
            </Button>
            <Button
              variant={view === 'chart' ? 'default' : 'outline'}
              className={view === 'chart' ? 'bg-dye-primary hover:bg-dye-secondary' : ''}
              onClick={() => setView('chart')}
              size="sm"
            >
              Chart
            </Button>
          </div>
          <Button onClick={onExport} variant="outline" size="sm">
            Export Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {view === 'table' ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Fabric</TableHead>
                  <TableHead>Machine</TableHead>
                  <TableHead>Dye Type</TableHead>
                  <TableHead className="text-right">Dye Amount</TableHead>
                  <TableHead className="text-right">ROI</TableHead>
                  <TableHead className="text-right">Success</TableHead>
                  <TableHead className="text-right">Env. Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No optimization history available
                    </TableCell>
                  </TableRow>
                ) : (
                  history.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {new Date(record.result.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{record.parameters.fabricWeight}g</TableCell>
                      <TableCell>{record.parameters.machineType}</TableCell>
                      <TableCell>{record.parameters.dyeType}</TableCell>
                      <TableCell className="text-right">
                        {record.result.dyeAmount.toFixed(2)} g/kg
                      </TableCell>
                      <TableCell className="text-right">
                        {record.result.roi.toFixed(2)}x
                      </TableCell>
                      <TableCell className="text-right">
                        {record.result.successScore}%
                      </TableCell>
                      <TableCell className="text-right">
                        {record.result.environmentalImpact}%
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="dyeAmount"
                  name="Dye Amount (g/kg)"
                  stroke="#6E59A5"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="roi"
                  name="ROI"
                  stroke="#8B5CF6"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="successScore"
                  name="Success Score (%)"
                  stroke="#9b87f5"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="environmentalImpact"
                  name="Environmental Impact (%)"
                  stroke="#7E69AB"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoryTable;
