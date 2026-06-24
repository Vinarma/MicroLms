import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { KeyRound, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { resetPassword } from '../utils/auth';

export function ForgotPassword({ onBackToLogin }) {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate email verification
    setTimeout(() => {
      setIsLoading(false);
      setStep('reset');
    }, 1000);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = resetPassword(email, newPassword);
      setIsLoading(false);

      if (result.success) {
        setStep('success');
      } else {
        setError(result.message || 'Password reset failed');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-element absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-3xl" 
             style={{ animation: 'float 6s ease-in-out infinite' }} />
        <div className="floating-element absolute bottom-32 right-20 w-40 h-40 bg-cyan-400/10 rounded-full" 
             style={{ animation: 'float 8s ease-in-out infinite 1s' }} />
      </div>

      {/* 3D Card */}
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
          
          {step !== 'success' && (
            <button
              onClick={onBackToLogin}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to login
            </button>
          )}

          {step === 'email' && (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl mb-4 shadow-lg"
                     style={{ animation: 'bounce-slow 3s ease-in-out infinite' }}>
                  <KeyRound className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Forgot Password?
                </h1>
                <p className="text-gray-600">Enter your email to reset your password</p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-2 focus:border-cyan-500 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? 'Verifying...' : 'Continue'}
                </Button>
              </form>
            </>
          )}

          {step === 'reset' && (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl mb-4 shadow-lg"
                     style={{ animation: 'bounce-slow 3s ease-in-out infinite' }}>
                  <KeyRound className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Reset Password
                </h1>
                <p className="text-gray-600">Enter your new password</p>
              </div>

              <form onSubmit={handlePasswordReset} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-gray-700">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-12 border-2 focus:border-cyan-500 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 border-2 focus:border-cyan-500 rounded-xl"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            </>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
                   style={{ animation: 'bounce-slow 2s ease-in-out infinite' }}>
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                Password Reset Successfully!
              </h1>
              <p className="text-gray-600 mb-8">
                Your password has been reset. You can now log in with your new password.
              </p>
              <Button
                onClick={onBackToLogin}
                className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl shadow-lg"
              >
                Back to Login
              </Button>
            </div>
          )}
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
