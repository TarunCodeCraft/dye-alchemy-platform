
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

interface OptimizationFormProps {
  onSubmit: (data: OptimizationData) => void;
}

export interface OptimizationData {
  fabricWeight: number;
  machineType: string;
  dyeType: string;
  fabricType: string; // Add this line
  temperature: number;
  time: number;
  ph: number;
  chemicalConcentration: number;
}

const OptimizationForm = ({ onSubmit }: OptimizationFormProps) => {
  const [formData, setFormData] = useState<OptimizationData>({
    fabricWeight: 100,
    machineType: 'jet',
    dyeType: 'reactive',
    fabricType: 'cotton', // Add this line
    temperature: 80,
    time: 60,
    ph: 7,
    chemicalConcentration: 5,
  });

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'fabricWeight' || name === 'temperature' || name === 'time' || 
              name === 'ph' || name === 'chemicalConcentration' 
                ? parseFloat(value) 
                : value,
    }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value[0],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form data
    if (formData.fabricWeight <= 0) {
      toast({
        title: "Validation Error",
        description: "Fabric weight must be greater than 0.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Optimization Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fabric Weight */}
            <div className="space-y-2">
              <label htmlFor="fabricWeight" className="text-sm font-medium">
                Fabric Weight (g)
              </label>
              <Input
                id="fabricWeight"
                name="fabricWeight"
                type="number"
                min="1"
                step="1"
                value={formData.fabricWeight}
                onChange={handleChange}
                required
              />
            </div>

            {/* Fabric Type */}
            <div className="space-y-2">
              <label htmlFor="fabricType" className="text-sm font-medium">
                Fabric Type
              </label>
              <select
                id="fabricType"
                name="fabricType"
                value={formData.fabricType}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dye-primary"
                required
              >
                <option value="cotton">Cotton</option>
                <option value="polyester">Polyester</option>
                <option value="silk">Silk</option>
                <option value="wool">Wool</option>
                <option value="nylon">Nylon</option>
                <option value="rayon">Rayon</option>
              </select>
            </div>

            {/* Machine Type */}
            <div className="space-y-2">
              <label htmlFor="machineType" className="text-sm font-medium">
                Machine Type
              </label>
              <select
                id="machineType"
                name="machineType"
                value={formData.machineType}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dye-primary"
                required
              >
                <option value="jet">Jet</option>
                <option value="jigger">Jigger</option>
                <option value="padding">Padding</option>
                <option value="winch">Winch</option>
                <option value="beam">Beam</option>
              </select>
            </div>

            {/* Dye Type */}
            <div className="space-y-2">
              <label htmlFor="dyeType" className="text-sm font-medium">
                Dye Type
              </label>
              <select
                id="dyeType"
                name="dyeType"
                value={formData.dyeType}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dye-primary"
                required
              >
                <option value="reactive">Reactive</option>
                <option value="disperse">Disperse</option>
                <option value="acid">Acid</option>
                <option value="vat">Vat</option>
                <option value="direct">Direct</option>
              </select>
            </div>

            {/* Temperature */}
            <div className="space-y-2">
              <label htmlFor="temperature" className="text-sm font-medium flex justify-between">
                <span>Temperature (°C)</span>
                <span className="text-dye-primary font-medium">{formData.temperature}°C</span>
              </label>
              <Slider
                id="temperature"
                name="temperature"
                min={20}
                max={100}
                step={1}
                value={[formData.temperature]}
                onValueChange={(value) => handleSliderChange('temperature', value)}
                className="py-4"
              />
            </div>

            {/* Time */}
            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium flex justify-between">
                <span>Time (min)</span>
                <span className="text-dye-primary font-medium">{formData.time} min</span>
              </label>
              <Slider
                id="time"
                name="time"
                min={15}
                max={120}
                step={5}
                value={[formData.time]}
                onValueChange={(value) => handleSliderChange('time', value)}
                className="py-4"
              />
            </div>

            {/* pH Value */}
            <div className="space-y-2">
              <label htmlFor="ph" className="text-sm font-medium flex justify-between">
                <span>pH Value</span>
                <span className="text-dye-primary font-medium">{formData.ph}</span>
              </label>
              <Slider
                id="ph"
                name="ph"
                min={4}
                max={11}
                step={0.1}
                value={[formData.ph]}
                onValueChange={(value) => handleSliderChange('ph', value)}
                className="py-4"
              />
            </div>

            {/* Chemical Concentration */}
            <div className="space-y-2">
              <label htmlFor="chemicalConcentration" className="text-sm font-medium flex justify-between">
                <span>Chemical Concentration (%)</span>
                <span className="text-dye-primary font-medium">{formData.chemicalConcentration}%</span>
              </label>
              <Slider
                id="chemicalConcentration"
                name="chemicalConcentration"
                min={0}
                max={20}
                step={0.5}
                value={[formData.chemicalConcentration]}
                onValueChange={(value) => handleSliderChange('chemicalConcentration', value)}
                className="py-4"
              />
            </div>
          </div>

          <CardFooter className="px-0 pt-4">
            <Button
              type="submit"
              className="w-full bg-dye-primary hover:bg-dye-secondary"
            >
              Optimize Dye Process
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default OptimizationForm;
