
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  isLogin?: boolean;
}

export const AuthForm = ({ isLogin = true }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    // In a real app, these would connect to an actual backend
    // For now, we'll simulate successful authentication
    toast({
      title: isLogin ? "Login successful" : "Account created",
      description: isLogin 
        ? "Welcome back to Dye Optimizer" 
        : "Your account has been created successfully",
    });

    // Store fake auth state in localStorage with default role as operator
    localStorage.setItem('dyeOptimizerUser', JSON.stringify({
      email,
      role: 'operator', // Default role is now always operator
      token: 'fake-jwt-token-' + Math.random().toString(36).substring(2)
    }));

    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {isLogin ? 'Login to Dye Optimizer' : 'Create Account'}
        </CardTitle>
        <CardDescription className="text-center">
          {isLogin 
            ? 'Enter your credentials to access your account' 
            : 'Fill in the details below to create your account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="youremail@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full bg-dye-primary hover:bg-dye-secondary">
            {isLogin ? 'Login' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-dye-accent"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-dye-accent"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
