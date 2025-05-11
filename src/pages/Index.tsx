
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-dye-secondary/10 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight gradient-heading">
                  Intelligent Dyeing Process Optimization
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Minimize waste, reduce environmental impact, and improve consistency in your textile dyeing processes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate('/dashboard')} 
                    className="bg-dye-primary hover:bg-dye-secondary text-lg px-6 py-2 h-auto"
                    size="lg"
                  >
                    Start Optimizing
                  </Button>
                  <Button 
                    onClick={() => navigate('/login')} 
                    variant="outline" 
                    className="text-lg px-6 py-2 h-auto"
                    size="lg"
                  >
                    Login
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 w-full max-w-md">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-12 w-12 bg-dye-secondary rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dye-primary">
                        <path d="M9 17h6l2 2H7l2-2Z" />
                        <path d="M12 17V5l-2 2M12 5l2 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Dye Optimization</h3>
                      <p className="text-sm text-gray-500">Machine: Jet | Dye: Reactive</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Optimized Dye Amount</span>
                      <span className="font-bold text-dye-primary">24.5 g/kg</span>
                    </div>
                    
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-dye-accent rounded-full" style={{width: '65%'}}></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">ROI</p>
                        <p className="text-lg font-bold">3.2x</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Success Score</p>
                        <p className="text-lg font-bold">92%</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Environmental Impact</p>
                        <p className="text-lg font-bold">28%</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Water Saved</p>
                        <p className="text-lg font-bold">120L</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -z-10 -top-6 -right-6 w-full h-full bg-dye-secondary/30 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="h-12 w-12 bg-dye-secondary/30 text-dye-primary rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 14 4-4" />
                    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Minimize Dye Waste</h3>
                <p className="text-gray-600">
                  Our advanced algorithms calculate the optimal amount of dye needed for each process, reducing waste and saving costs.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="h-12 w-12 bg-dye-secondary/30 text-dye-primary rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                    <path d="M13 5v14" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Environmental Impact</h3>
                <p className="text-gray-600">
                  Track and reduce the environmental footprint of your dyeing processes with our impact scoring system.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="h-12 w-12 bg-dye-secondary/30 text-dye-primary rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Improve ROI</h3>
                <p className="text-gray-600">
                  Maximize your return on investment by optimizing dye usage while maintaining quality and consistency.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-gradient-to-r from-dye-primary to-dye-accent py-16 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Dyeing Process?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join textile manufacturers worldwide who are reducing waste and improving efficiency with Dye Optimizer.
            </p>
            <Button 
              onClick={() => navigate('/signup')} 
              className="bg-white text-dye-primary hover:bg-gray-100 px-8 py-3 text-lg font-medium rounded-md"
              size="lg"
            >
              Sign Up for Free
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500">&copy; 2025 Dye Optimizer. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-dye-primary">Terms</a>
              <a href="#" className="text-gray-500 hover:text-dye-primary">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-dye-primary">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
