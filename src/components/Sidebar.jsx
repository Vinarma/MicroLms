import { BookOpen, LayoutDashboard, Library, User, LogOut, Trophy, Gamepad2 } from 'lucide-react';

export function Sidebar({ currentView, onViewChange, onLogout, user }) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'courses', icon: Library, label: 'Courses', gradient: 'from-purple-500 to-pink-500' },
    { id: 'scoreboard', icon: Trophy, label: 'Leaderboard', gradient: 'from-yellow-500 to-orange-500' },
    { id: 'games', icon: Gamepad2, label: 'Mini Games', gradient: 'from-green-500 to-emerald-500' },
    { id: 'profile', icon: User, label: 'Profile', gradient: 'from-indigo-500 to-purple-500' },
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-xl">
      {/* Logo Header with 3D effect */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300"
               style={{ transformStyle: 'preserve-3d' }}>
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-2xl text-white">MicroLMS</h1>
            <p className="text-sm text-white/80">Learn. Grow. Succeed.</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                  <span className="font-semibold">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section with 3D effect */}
      <div className="p-4 border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white">
        <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-white rounded-xl shadow-md"
             style={{ transformStyle: 'preserve-3d' }}>
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-500 shadow-lg"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 font-semibold transform hover:scale-105"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
