'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, mockUsers, getCurrentUser } from '@/data/users';

// Action types
type UserAction =
  | { type: 'SET_CURRENT_USER'; payload: User }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGOUT' };

// State interface
interface UserState {
  currentUser: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: UserState = {
  currentUser: getCurrentUser(),
  users: mockUsers,
  loading: false,
  error: null,
  isAuthenticated: true, // For prototype, always authenticated
};

// Reducer
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
        currentUser:
          state.currentUser?.id === action.payload.id
            ? action.payload
            : state.currentUser,
        loading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Context interface
interface UserContextType {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  // Helper functions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getUserById: (id: number) => User | undefined;
  getUsersByRole: (role: User['role']) => User[];
  getActiveUsers: () => User[];
  getUsersByDepartment: (department: string) => User[];
  hasPermission: (permission: keyof User['permissions']) => boolean;
  updateCurrentUser: (updates: Partial<User>) => void;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Helper functions
  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = state.users.find(u => u.email === email && u.isActive);
      if (user) {
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
        return true;
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Invalid credentials' });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const getUserById = (id: number): User | undefined => {
    return state.users.find(user => user.id === id);
  };

  const getUsersByRole = (role: User['role']): User[] => {
    return state.users.filter(user => user.role === role);
  };

  const getActiveUsers = (): User[] => {
    return state.users.filter(user => user.isActive);
  };

  const getUsersByDepartment = (department: string): User[] => {
    return state.users.filter(user => user.department === department);
  };

  const hasPermission = (permission: keyof User['permissions']): boolean => {
    return state.currentUser?.permissions[permission] ?? false;
  };

  const updateCurrentUser = (updates: Partial<User>) => {
    if (state.currentUser) {
      const updatedUser: User = {
        ...state.currentUser,
        ...updates,
        id: state.currentUser.id,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    }
  };

  const value: UserContextType = {
    state,
    dispatch,
    login,
    logout,
    getUserById,
    getUsersByRole,
    getActiveUsers,
    getUsersByDepartment,
    hasPermission,
    updateCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
