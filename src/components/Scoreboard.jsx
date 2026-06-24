import { useEffect, useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Flame, Star } from 'lucide-react';
import { getLeaderboard } from '../utils/storage';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function Scoreboard({ currentUserId }) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const data = getLeaderboard();
    setLeaderboard(data);
  }, []);

  const getMedalIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-700" />;
    return null;
  };

  const getMedalColor = (rank) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-amber-600 to-amber-800';
    return 'from-blue-500 to-purple-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with 3D effect */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300"
               style={{ 
                 animation: 'bounce-slow 3s ease-in-out infinite',
                 transformStyle: 'preserve-3d'
               }}>
            <Trophy className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-3">
            Leaderboard
          </h1>
          <p className="text-xl text-gray-600">Top learners of the month</p>
        </div>

        {/* Top 3 Podium with 3D effect */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            {/* 2nd Place */}
            <div className="flex flex-col items-center pt-12">
              <div className="card-3d relative mb-4 transform hover:scale-105 transition-all duration-300"
                   style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute -top-3 -right-3 z-10">
                  {getMedalIcon(2)}
                </div>
                <Avatar className="w-20 h-20 border-4 border-gray-400 shadow-xl">
                  <AvatarImage src={leaderboard[1].avatar} alt={leaderboard[1].name} />
                  <AvatarFallback className="bg-gradient-to-br from-gray-300 to-gray-500 text-white">
                    {leaderboard[1].name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{leaderboard[1].name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold">{leaderboard[1].totalPoints}</span>
              </div>
              <div className="bg-gradient-to-br from-gray-300 to-gray-500 text-white px-6 py-4 rounded-t-2xl w-full text-center shadow-lg">
                <div className="text-2xl font-bold mb-1">2</div>
                <div className="text-xs opacity-90">Silver</div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <div className="card-3d relative mb-4 transform hover:scale-110 transition-all duration-300"
                   style={{ transformStyle: 'preserve-3d', animation: 'float 3s ease-in-out infinite' }}>
                <div className="absolute -top-3 -right-3 z-10">
                  {getMedalIcon(1)}
                </div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    👑 CHAMPION
                  </div>
                </div>
                <Avatar className="w-28 h-28 border-4 border-yellow-400 shadow-2xl">
                  <AvatarImage src={leaderboard[0].avatar} alt={leaderboard[0].name} />
                  <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white text-2xl">
                    {leaderboard[0].name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3 className="font-bold text-gray-800 mb-1 text-lg">{leaderboard[0].name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold">{leaderboard[0].totalPoints}</span>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white px-6 py-6 rounded-t-2xl w-full text-center shadow-xl">
                <div className="text-3xl font-bold mb-1">1</div>
                <div className="text-sm opacity-90">Gold</div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center pt-16">
              <div className="card-3d relative mb-4 transform hover:scale-105 transition-all duration-300"
                   style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute -top-3 -right-3 z-10">
                  {getMedalIcon(3)}
                </div>
                <Avatar className="w-20 h-20 border-4 border-amber-700 shadow-xl">
                  <AvatarImage src={leaderboard[2].avatar} alt={leaderboard[2].name} />
                  <AvatarFallback className="bg-gradient-to-br from-amber-600 to-amber-800 text-white">
                    {leaderboard[2].name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{leaderboard[2].name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold">{leaderboard[2].totalPoints}</span>
              </div>
              <div className="bg-gradient-to-br from-amber-600 to-amber-800 text-white px-6 py-3 rounded-t-2xl w-full text-center shadow-lg">
                <div className="text-2xl font-bold mb-1">3</div>
                <div className="text-xs opacity-90">Bronze</div>
              </div>
            </div>
          </div>
        )}

        {/* Rest of the leaderboard */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Rankings</h2>
            <div className="space-y-3">
              {leaderboard.map((entry, index) => {
                const rank = index + 1;
                const isCurrentUser = entry.id === currentUserId;
                
                return (
                  <div
                    key={entry.id}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:shadow-md ${
                      isCurrentUser 
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    style={{
                      animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
                    }}
                  >
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${getMedalColor(rank)} text-white font-bold shadow-md`}>
                      {rank <= 3 ? getMedalIcon(rank) : rank}
                    </div>

                    <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                      <AvatarImage src={entry.avatar} alt={entry.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {entry.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800">{entry.name}</h3>
                        {isCurrentUser && (
                          <Badge className="bg-purple-600">You</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {entry.completedCourses} courses
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          {entry.streak} day streak
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xl font-bold text-gray-800">{entry.totalPoints}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .card-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
