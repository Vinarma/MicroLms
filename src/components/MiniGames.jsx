import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Gamepad2, Brain, Zap, Trophy, Timer, Star } from 'lucide-react';
import { saveMiniGameScore, getMiniGameScore } from '../utils/storage';

export function MiniGames({ userId, onScoreUpdate }) {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 'code-quiz',
      title: 'Code Speed Quiz',
      description: 'Answer coding questions as fast as you can!',
      icon: Zap,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'memory-match',
      title: 'Tech Memory Match',
      description: 'Match programming concepts and definitions',
      icon: Brain,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'typing-challenge',
      title: 'Code Typing Challenge',
      description: 'Type code snippets accurately and quickly',
      icon: Gamepad2,
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  if (selectedGame === 'code-quiz') {
    return <CodeSpeedQuiz userId={userId} onBack={() => setSelectedGame(null)} onScoreUpdate={onScoreUpdate} />;
  }

  if (selectedGame === 'memory-match') {
    return <MemoryMatch userId={userId} onBack={() => setSelectedGame(null)} onScoreUpdate={onScoreUpdate} />;
  }

  if (selectedGame === 'typing-challenge') {
    return <TypingChallenge userId={userId} onBack={() => setSelectedGame(null)} onScoreUpdate={onScoreUpdate} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl mb-6 shadow-2xl"
               style={{ animation: 'bounce-slow 3s ease-in-out infinite' }}>
            <Gamepad2 className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Mini Games
          </h1>
          <p className="text-xl text-gray-600">Learn while having fun!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <Card
                key={game.id}
                className="card-3d bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => setSelectedGame(game.id)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`bg-gradient-to-br ${game.color} p-6 text-white`}>
                  <Icon className="w-12 h-12 mb-3" />
                  <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
                  <p className="text-white/90">{game.description}</p>
                </div>
                <div className="p-6">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Play Now
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        .card-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}

// Code Speed Quiz Game
function CodeSpeedQuiz({ userId, onBack, onScoreUpdate }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      question: 'What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
      correct: 0
    },
    {
      question: 'Which is NOT a JavaScript data type?',
      options: ['String', 'Boolean', 'Float', 'Number'],
      correct: 2
    },
    {
      question: 'What does CSS stand for?',
      options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Colorful Style Sheets'],
      correct: 1
    },
    {
      question: 'Which method adds an element to the end of an array?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      correct: 0
    },
    {
      question: 'What is the correct way to declare a variable in JavaScript?',
      options: ['variable x = 5', 'v x = 5', 'let x = 5', 'dim x = 5'],
      correct: 2
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      saveMiniGameScore(userId, 'code-quiz', score);
      onScoreUpdate(score * 10);
    }
  }, [timeLeft, gameOver]);

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correct;
    
    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 1);
      }
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setGameOver(true);
        const finalScore = isCorrect ? score + 1 : score;
        saveMiniGameScore(userId, 'code-quiz', finalScore);
        onScoreUpdate(finalScore * 10);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 p-6 flex items-center justify-center">
      <Card className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="outline">← Back</Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-xl">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">{score}</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-xl">
              <Timer className="w-5 h-5 text-orange-500" />
              <span className="font-bold">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {!gameOver ? (
          <div>
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">Question {currentQuestion + 1} of {questions.length}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                     style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">{questions[currentQuestion].question}</h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all duration-300 ${
                    selectedAnswer === null
                      ? 'bg-gray-100 hover:bg-gray-200 hover:shadow-md'
                      : selectedAnswer === index
                      ? index === questions[currentQuestion].correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : index === questions[currentQuestion].correct
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Over!</h2>
            <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
              {score} / {questions.length}
            </div>
            <p className="text-gray-600 mb-6">You earned {score * 10} points!</p>
            <Button onClick={onBack} className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white">
              Back to Games
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

// Memory Match Game
function MemoryMatch({ userId, onBack, onScoreUpdate }) {
  const pairs = [
    { term: 'HTML', definition: 'Markup Language' },
    { term: 'CSS', definition: 'Styling Language' },
    { term: 'JavaScript', definition: 'Programming Language' },
    { term: 'React', definition: 'UI Library' },
    { term: 'API', definition: 'Application Interface' },
    { term: 'JSON', definition: 'Data Format' }
  ];

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const allCards = [
      ...pairs.map((p, i) => ({ id: i * 2, content: p.term, pair: i })),
      ...pairs.map((p, i) => ({ id: i * 2 + 1, content: p.definition, pair: i }))
    ].sort(() => Math.random() - 0.5);
    setCards(allCards);
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      if (cards[first].pair === cards[second].pair) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        
        if (matched.length + 2 === cards.length) {
          const score = Math.max(100 - moves * 5, 20);
          saveMiniGameScore(userId, 'memory-match', score);
          onScoreUpdate(score);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const isComplete = matched.length === cards.length && cards.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-6">
      <Card className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="outline">← Back</Button>
          <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-xl">
            <span className="font-semibold">Moves: {moves}</span>
          </div>
        </div>

        {!isComplete ? (
          <div className="grid grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`aspect-square rounded-xl font-semibold text-sm flex items-center justify-center transition-all duration-300 transform ${
                  flipped.includes(index) || matched.includes(index)
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-105'
                    : 'bg-gradient-to-br from-gray-300 to-gray-400 text-transparent hover:scale-105'
                }`}
              >
                {(flipped.includes(index) || matched.includes(index)) && card.content}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy className="w-20 h-20 text-purple-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h2>
            <p className="text-gray-600 mb-2">Completed in {moves} moves</p>
            <p className="text-xl font-bold text-purple-600 mb-6">Score: {Math.max(100 - moves * 5, 20)} points</p>
            <Button onClick={onBack} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Back to Games
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

// Typing Challenge Game
function TypingChallenge({ userId, onBack, onScoreUpdate }) {
  const codeSnippets = [
    'function hello() { return "world"; }',
    'const array = [1, 2, 3].map(x => x * 2);',
    'let result = data.filter(item => item.active);',
    'if (condition) { doSomething(); } else { doOtherThing(); }',
    'const obj = { name: "John", age: 30 };'
  ];

  const [currentSnippet] = useState(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isComplete) {
      setIsComplete(true);
    }
  }, [timeLeft, isComplete]);

  useEffect(() => {
    if (input === currentSnippet) {
      setIsComplete(true);
      const wpm = Math.floor((currentSnippet.length / 5) / ((30 - timeLeft) / 60));
      const score = Math.min(wpm, 100);
      saveMiniGameScore(userId, 'typing-challenge', score);
      onScoreUpdate(score);
    }
  }, [input]);

  const accuracy = input.length > 0 
    ? Math.floor((input.split('').filter((char, i) => char === currentSnippet[i]).length / input.length) * 100)
    : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 p-6 flex items-center justify-center">
      <Card className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="outline">← Back</Button>
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 px-4 py-2 rounded-xl font-semibold">
              Accuracy: {accuracy}%
            </div>
            <div className="bg-orange-100 px-4 py-2 rounded-xl font-semibold">
              {timeLeft}s
            </div>
          </div>
        </div>

        {!isComplete ? (
          <div>
            <div className="bg-gray-900 text-green-400 p-6 rounded-xl mb-6 font-mono text-lg">
              {currentSnippet}
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Start typing..."
              className="w-full p-4 border-2 border-gray-300 rounded-xl font-mono focus:border-blue-500 focus:outline-none resize-none"
              rows={3}
              autoFocus
            />
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy className="w-20 h-20 text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {input === currentSnippet ? 'Perfect!' : 'Time Up!'}
            </h2>
            <p className="text-xl font-bold text-blue-600 mb-6">Accuracy: {accuracy}%</p>
            <Button onClick={onBack} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              Back to Games
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
