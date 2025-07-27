import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, User, Reward, Challenge, Difficulty, AvatarItem } from '../types';
import { generateId, calculateTaskReward, calculateXpForNextLevel } from '../utils/helpers';

interface AppContextProps {
  tasks: Task[];
  user: User;
  challenges: Challenge[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
  completeTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  unlockAvatarItem: (itemId: string) => void;
  equipAvatarItem: (itemId: string) => void;
  joinChallenge: (challengeId: string) => void;
  completeChallenge: (challengeId: string) => void;
  getTaskSuggestions: () => Task[];
}

interface AppProviderProps {
  children: ReactNode;
}

// Default avatar items
const defaultAvatarItems: AvatarItem[] = [
  {
    id: 'hair-1',
    name: 'Basic Hair',
    type: 'hair',
    imageUrl: '/assets/avatar/hair-1.png',
    unlockLevel: 1,
    unlocked: true,
    equipped: true,
  },
  {
    id: 'face-1',
    name: 'Basic Face',
    type: 'face',
    imageUrl: '/assets/avatar/face-1.png',
    unlockLevel: 1,
    unlocked: true,
    equipped: true,
  },
  {
    id: 'body-1',
    name: 'Basic Body',
    type: 'body',
    imageUrl: '/assets/avatar/body-1.png',
    unlockLevel: 1,
    unlocked: true,
    equipped: true,
  },
  {
    id: 'hair-2',
    name: 'Cool Hair',
    type: 'hair',
    imageUrl: '/assets/avatar/hair-2.png',
    unlockLevel: 3,
    unlocked: false,
    equipped: false,
  },
  {
    id: 'accessory-1',
    name: 'Glasses',
    type: 'accessory',
    imageUrl: '/assets/avatar/accessory-1.png',
    unlockLevel: 5,
    unlocked: false,
    equipped: false,
  },
];

// Initial rewards
const initialRewards: Reward[] = [
  {
    id: 'badge-1',
    name: 'First Task',
    description: 'Complete your first task',
    xpValue: 50,
    coinValue: 10,
    type: 'badge',
    iconUrl: '/assets/rewards/badge-1.png',
  },
];

// Initial user
const initialUser: User = {
  id: 'user-1',
  username: 'TaskHero',
  avatar: {
    items: defaultAvatarItems,
    level: 1,
  },
  xp: 0,
  coins: 0,
  level: 1,
  completedTasks: 0,
  rewards: [],
  streakDays: 0,
};

// Initial challenges
const initialChallenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Task Master',
    description: 'Complete 5 tasks',
    targetCount: 5,
    currentCount: 0,
    completed: false,
    deadline: new Date(new Date().setDate(new Date().getDate() + 7)),
    reward: {
      id: 'reward-taskmaster',
      name: 'Task Master Badge',
      description: 'You are a master of tasks!',
      xpValue: 100,
      coinValue: 50,
      type: 'badge',
      iconUrl: '/assets/rewards/taskmaster.png',
    },
  },
];

// Create the context
const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User>(initialUser);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedUser = localStorage.getItem('user');
    const savedChallenges = localStorage.getItem('challenges');

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedChallenges) setChallenges(JSON.parse(savedChallenges));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('challenges', JSON.stringify(challenges));
  }, [tasks, user, challenges]);

  // Check for level up
  useEffect(() => {
    const xpForNextLevel = calculateXpForNextLevel(user.level);
    if (user.xp >= xpForNextLevel) {
      setUser((prev) => ({
        ...prev,
        level: prev.level + 1,
        xp: prev.xp - xpForNextLevel,
      }));
    }
  }, [user.xp, user.level]);

  // Add a new task
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // Complete a task
  const completeTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, completed: true, completedAt: new Date() }
          : task
      )
    );

    // Find the completed task
    const completedTask = tasks.find((task) => task.id === taskId);
    if (!completedTask) return;

    // Calculate rewards
    const { xp, coins } = calculateTaskReward(completedTask.difficulty);

    // Update user
    setUser((prev) => ({
      ...prev,
      xp: prev.xp + xp,
      coins: prev.coins + coins,
      completedTasks: prev.completedTasks + 1,
    }));

    // Update challenges progress
    setChallenges((prev) =>
      prev.map((challenge) => {
        if (challenge.title === 'Task Master' && !challenge.completed) {
          const newCount = challenge.currentCount + 1;
          const completed = newCount >= challenge.targetCount;
          
          // If challenge completed, add reward
          if (completed) {
            setUser((prevUser) => ({
              ...prevUser,
              xp: prevUser.xp + challenge.reward.xpValue,
              coins: prevUser.coins + challenge.reward.coinValue,
              rewards: [...prevUser.rewards, challenge.reward],
            }));
          }
          
          return {
            ...challenge,
            currentCount: newCount,
            completed: completed,
          };
        }
        return challenge;
      })
    );

    // Add First Task badge if it's the first completed task
    if (user.completedTasks === 0) {
      const firstTaskBadge = initialRewards.find((r) => r.name === 'First Task');
      if (firstTaskBadge) {
        setUser((prev) => ({
          ...prev,
          rewards: [...prev.rewards, firstTaskBadge],
          xp: prev.xp + firstTaskBadge.xpValue,
          coins: prev.coins + firstTaskBadge.coinValue,
        }));
      }
    }
  };

  // Delete a task
  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Unlock avatar item
  const unlockAvatarItem = (itemId: string) => {
    // Find the item to unlock
    const itemToUnlock = user.avatar.items.find((item) => item.id === itemId);
    if (!itemToUnlock || itemToUnlock.unlocked) return;

    // Calculate cost
    const unlockCost = itemToUnlock.unlockLevel * 50;
    if (user.coins < unlockCost) return;

    // Update user avatar and coins
    setUser((prev) => ({
      ...prev,
      coins: prev.coins - unlockCost,
      avatar: {
        ...prev.avatar,
        items: prev.avatar.items.map((item) =>
          item.id === itemId ? { ...item, unlocked: true } : item
        ),
      },
    }));
  };

  // Equip avatar item
  const equipAvatarItem = (itemId: string) => {
    // Find the item to equip
    const itemToEquip = user.avatar.items.find((item) => item.id === itemId);
    if (!itemToEquip || !itemToEquip.unlocked) return;

    // Update user avatar
    setUser((prev) => ({
      ...prev,
      avatar: {
        ...prev.avatar,
        items: prev.avatar.items.map((item) =>
          item.type === itemToEquip.type
            ? { ...item, equipped: item.id === itemId }
            : item
        ),
      },
    }));
  };

  // Join a challenge
  const joinChallenge = (challengeId: string) => {
    // Implementation would depend on challenge mechanics
    console.log(`Joined challenge: ${challengeId}`);
  };

  // Complete a challenge
  const completeChallenge = (challengeId: string) => {
    // Implementation would depend on challenge mechanics
    console.log(`Completed challenge: ${challengeId}`);
  };

  // Get task suggestions based on past behavior
  const getTaskSuggestions = (): Task[] => {
    // Simplified suggestion logic based on completed tasks
    const completedTasks = tasks.filter(task => task.completed);
    
    if (completedTasks.length === 0) {
      // If no completed tasks, suggest some default tasks
      return [
        {
          id: 'suggestion-1',
          title: 'Set up your daily goals',
          description: 'Plan your day by listing important tasks',
          difficulty: 'easy',
          deadline: new Date(new Date().setDate(new Date().getDate() + 1)),
          completed: false,
          createdAt: new Date(),
        },
        {
          id: 'suggestion-2',
          title: 'Complete your first task',
          description: 'Start your productivity journey by completing one task',
          difficulty: 'easy',
          deadline: new Date(new Date().setDate(new Date().getDate() + 1)),
          completed: false,
          createdAt: new Date(),
        }
      ];
    }
    
    // Group tasks by difficulty
    const difficultyGroups: Record<Difficulty, number> = {
      easy: 0,
      medium: 0,
      hard: 0,
      expert: 0
    };
    
    completedTasks.forEach(task => {
      difficultyGroups[task.difficulty]++;
    });
    
    // Find the most common difficulty level
    let preferredDifficulty: Difficulty = 'easy';
    let maxCount = 0;
    
    Object.entries(difficultyGroups).forEach(([difficulty, count]) => {
      if (count > maxCount) {
        maxCount = count;
        preferredDifficulty = difficulty as Difficulty;
      }
    });
    
    // Suggest tasks based on preferred difficulty
    return [
      {
        id: `suggestion-${generateId()}`,
        title: `Suggested ${preferredDifficulty} task`,
        description: `A task based on your preference for ${preferredDifficulty} difficulty tasks`,
        difficulty: preferredDifficulty,
        deadline: new Date(new Date().setDate(new Date().getDate() + 2)),
        completed: false,
        createdAt: new Date(),
      }
    ];
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        user,
        challenges,
        addTask,
        completeTask,
        deleteTask,
        unlockAvatarItem,
        equipAvatarItem,
        joinChallenge,
        completeChallenge,
        getTaskSuggestions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 