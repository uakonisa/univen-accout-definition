// 📲 login.tsx - Email magic link login page for University of Venda System

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    if (!email) return;
    await signIn(email);
    setMessage('Check your email for the login link.');
    setEmail('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <img src="/icons/univen-icon-192.png" alt="Univen Logo" className="mx-auto mb-4 w-20 h-20" />
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          University of Venda Login
        </h2>
        <Input
          type="email"
          placeholder="Enter your university email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button className="mt-4 w-full" onClick={handleLogin}>
          Send Magic Link
        </Button>
        {message && <p className="text-green-600 text-sm mt-4">{message}</p>}
      </div>
    </div>
  );
}
