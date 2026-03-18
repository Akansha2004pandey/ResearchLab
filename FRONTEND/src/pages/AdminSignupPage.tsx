import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { adminSignup, setAdminToken } from '@/lib/adminApi';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AdminSignupPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    signupKey: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await adminSignup(form);
      setAdminToken(result.token);
      toast({ title: 'Admin account created', description: `Welcome ${result.user.name}` });
      navigate('/admin');
    } catch (error) {
      toast({
        title: 'Signup failed',
        description: error instanceof Error ? error.message : 'Could not create admin account',
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
          <CardTitle className="text-2xl font-heading">Admin Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                className="rounded-none"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                className="rounded-none"
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                className="rounded-none"
                type="password"
                minLength={8}
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signupKey">Signup Key (optional)</Label>
              <Input
                id="signupKey"
                className="rounded-none"
                value={form.signupKey}
                onChange={(e) => setForm((prev) => ({ ...prev, signupKey: e.target.value }))}
              />
            </div>
            <Button className="w-full rounded-none" type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create admin account'}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">
            Already have an admin account? <Link to="/admin/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
