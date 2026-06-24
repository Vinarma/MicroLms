import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { GraduationCap, Mail, Lock, User, Sparkles } from 'lucide-react';
import { registerUser } from '../utils/auth';
import { toast } from 'sonner@2.0.3';

export function Register({ onRegister, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = registerUser(name, email, password);
      setIsLoading(false);

      if (result.success && result.user) {
        toast.success('Account created! 🎓', {
          description: 'Welcome to MicroLMS. Start learning today!'
        });
        onRegister(result.user);
      } else {
        setError(result.message || 'Registration failed');
        toast.error('Registration failed', {
          description: result.message || 'Please try again'
        });
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-element absolute top-10 right-10 w-36 h-36 bg-white/10 rounded-full" 
             style={{ animation: 'float 7s ease-in-out infinite' }} />
        <div className="floating-element absolute top-1/3 left-10 w-28 h-28 bg-pink-400/20 rounded-3xl" 
             style={{ animation: 'float 8s ease-in-out infinite 1s' }} />
        <div className="floating-element absolute bottom-20 right-1/4 w-32 h-32 bg-purple-400/15 rounded-2xl" 
             style={{ animation: 'float 6s ease-in-out infinite 2s' }} />
      </div>

      {/* 3D Register Card */}
      <div className="w-full max-w-md relative">
        <div className="card-3d bg-white rounded-3xl shadow-2xl p-8 md:p-10 backdrop-blur-sm bg-white/95 border border-white/20"
             style={{ 
               transform: 'perspective(1000px) rotateX(2deg)',
               transition: 'transform 0.3s ease'
             }}
             onMouseMove={(e) => {
               const card = e.currentTarget;
               const rect = card.getBoundingClientRect();
               const x = e.clientX - rect.left;
               const y = e.clientY - rect.top;
               const centerX = rect.width / 2;
               const centerY = rect.height / 2;
               const rotateX = (y - centerY) / 20;
               const rotateY = (centerX - x) / 20;
               card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(0deg)';
             }}>
          
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg"
                 style={{ animation: 'bounce-slow 3s ease-in-out infinite' }}>
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Join MicroLMS
            </h1>
            <p className="text-gray-600">Start your learning adventure today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 border-2 focus:border-indigo-500 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-2 focus:border-indigo-500 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 border-2 focus:border-indigo-500 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 h-12 border-2 focus:border-indigo-500 rounded-xl"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Create Account
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .card-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
