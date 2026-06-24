// Get leaderboard data
export const getLeaderboard = () => {
  const users = localStorage.getItem('lms_users');
  if (!users) return [];

  const parsedUsers = JSON.parse(users);
  return parsedUsers
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      totalPoints: user.totalPoints || 0,
      completedCourses: user.enrolledCourses?.length || 0,
      streak: user.streak || 0
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 10);
};

// Save assignment submission
export const saveAssignmentSubmission = (userId, assignmentId, submission) => {
  const key = `assignment_${userId}_${assignmentId}`;
  localStorage.setItem(key, JSON.stringify(submission));
};

// Get assignment submission
export const getAssignmentSubmission = (userId, assignmentId) => {
  const key = `assignment_${userId}_${assignmentId}`;
  const submission = localStorage.getItem(key);
  return submission ? JSON.parse(submission) : null;
};

// Save mini game score
export const saveMiniGameScore = (userId, gameId, score) => {
  const key = `game_${userId}_${gameId}`;
  const existing = localStorage.getItem(key);
  const existingScore = existing ? JSON.parse(existing) : { bestScore: 0, attempts: 0 };
  
  localStorage.setItem(key, JSON.stringify({
    bestScore: Math.max(existingScore.bestScore, score),
    lastScore: score,
    attempts: existingScore.attempts + 1,
    lastPlayed: new Date().toISOString()
  }));
};

// Get mini game score
export const getMiniGameScore = (userId, gameId) => {
  const key = `game_${userId}_${gameId}`;
  const score = localStorage.getItem(key);
  return score ? JSON.parse(score) : { bestScore: 0, attempts: 0 };
};
