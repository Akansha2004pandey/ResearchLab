import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { adminLogin, setAdminToken } from '@/lib/adminApi';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await adminLogin({ email, password });
      setAdminToken(result.token);
      toast({ title: 'Welcome back', description: `Logged in as ${result.user.name}` });
      navigate('/admin');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Invalid credentials',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="hero-gradient min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute right-6 top-6 z-10"><ThemeToggle /></div>
      <Card className="w-full max-w-md exp-card rounded-none">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" className="rounded-none" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                className="rounded-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full rounded-none" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">
            No admin account yet? <Link to="/admin/signup" className="text-primary hover:underline">Create one</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
