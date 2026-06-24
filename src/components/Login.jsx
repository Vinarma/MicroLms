import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { GraduationCap, Mail, Lock, Sparkles } from 'lucide-react';
import { loginUser } from '../utils/auth';
import { toast } from 'sonner@2.0.3';

export function Login({ onLogin, onSwitchToRegister, onSwitchToForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = loginUser(email, password);
      setIsLoading(false);

      if (result.success && result.user) {
        toast.success('Welcome back! 🎉', {
          description: 'Successfully logged in to MicroLMS'
        });
        onLogin(result.user);
      } else {
        setError(result.message || 'Login failed');
        toast.error('Login failed', {
          description: result.message || 'Please check your credentials'
        });
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 3D Floating Elements Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-3xl" 
             style={{ animation: 'float 6s ease-in-out infinite' }} />
        <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-purple-400/20 rounded-2xl" 
             style={{ animation: 'float 8s ease-in-out infinite 1s' }} />
        <div className="floating-element absolute bottom-32 left-1/4 w-40 h-40 bg-blue-400/10 rounded-3xl" 
             style={{ animation: 'float 7s ease-in-out infinite 2s' }} />
        <div className="floating-element absolute bottom-20 right-1/3 w-28 h-28 bg-indigo-400/15 rounded-2xl" 
             style={{ animation: 'float 9s ease-in-out infinite 1.5s' }} />
      </div>

      {/* 3D Login Card */}
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
          
          {/* Logo with 3D effect */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg"
                 style={{ 
                   transform: 'translateZ(50px)',
                   animation: 'bounce-slow 3s ease-in-out infinite'
                 }}>
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="pl-10 h-12 border-2 focus:border-purple-500 rounded-xl"
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
                  className="pl-10 h-12 border-2 focus:border-purple-500 rounded-xl"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={onSwitchToForgotPassword}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Sign In
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
              >
                Sign Up
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
          0%, 100% { transform: translateZ(50px) translateY(0); }
          50% { transform: translateZ(50px) translateY(-10px); }
        }

        .card-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
