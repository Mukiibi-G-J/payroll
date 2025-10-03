'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { User } from '@/data/users';

// Authentication state interface
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Authentication actions
export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Authentication reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Authentication context
interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock JWT token generation
const generateMockToken = (user: User): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    })
  );
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

// Mock user database with demo credentials
const mockUsers: User[] = [
  {
    id: 1,
    email: 'hr@accupay.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'hr_manager',
    department: 'Human Resources',
    position: 'HR Manager',
    isActive: true,
    lastLogin: '2024-01-15T08:30:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-01-15T08:30:00Z',
    permissions: {
      canViewEmployees: true,
      canEditEmployees: true,
      canDeleteEmployees: true,
      canProcessPayroll: true,
      canViewPayroll: true,
      canEditPayroll: true,
      canViewReports: true,
      canGenerateReports: true,
      canManageUsers: true,
      canViewSettings: true,
      canEditSettings: true,
    },
  },
  {
    id: 2,
    email: 'payroll@accupay.com',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'payroll_admin',
    department: 'Finance',
    position: 'Payroll Administrator',
    isActive: true,
    lastLogin: '2024-01-15T07:45:00Z',
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2024-01-15T07:45:00Z',
    permissions: {
      canViewEmployees: true,
      canEditEmployees: false,
      canDeleteEmployees: false,
      canProcessPayroll: true,
      canViewPayroll: true,
      canEditPayroll: true,
      canViewReports: true,
      canGenerateReports: true,
      canManageUsers: false,
      canViewSettings: true,
      canEditSettings: false,
    },
  },
  {
    id: 3,
    email: 'owner@accupay.com',
    firstName: 'David',
    lastName: 'Wilson',
    role: 'business_owner',
    department: 'Executive',
    position: 'Business Owner',
    isActive: true,
    lastLogin: '2024-01-14T16:20:00Z',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-14T16:20:00Z',
    permissions: {
      canViewEmployees: true,
      canEditEmployees: false,
      canDeleteEmployees: false,
      canProcessPayroll: false,
      canViewPayroll: true,
      canEditPayroll: false,
      canViewReports: true,
      canGenerateReports: true,
      canManageUsers: true,
      canViewSettings: true,
      canEditSettings: true,
    },
  },
  {
    id: 4,
    email: 'employee@accupay.com',
    firstName: 'Emily',
    lastName: 'Davis',
    role: 'employee',
    department: 'Engineering',
    position: 'Software Developer',
    isActive: true,
    lastLogin: '2024-01-15T08:00:00Z',
    createdAt: '2023-03-15T00:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
    permissions: {
      canViewEmployees: false,
      canEditEmployees: false,
      canDeleteEmployees: false,
      canProcessPayroll: false,
      canViewPayroll: false,
      canEditPayroll: false,
      canViewReports: false,
      canGenerateReports: false,
      canManageUsers: false,
      canViewSettings: false,
      canEditSettings: false,
    },
  },
];

// Role-based permissions
const rolePermissions: Record<string, string[]> = {
  hr_manager: ['read:all', 'write:all', 'delete:all', 'admin:all'],
  payroll_admin: [
    'read:payroll',
    'write:payroll',
    'read:employees',
    'read:reports',
  ],
  business_owner: [
    'read:all',
    'read:reports',
    'read:analytics',
    'admin:settings',
  ],
  employee: ['read:own', 'write:own_timesheet', 'read:own_payroll'],
};

// Authentication provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load authentication state from localStorage on mount
  useEffect(() => {
    const loadAuthState = () => {
      try {
        const storedToken = localStorage.getItem('accupay_token');
        const storedUser = localStorage.getItem('accupay_user');

        if (storedToken && storedUser) {
          const user = JSON.parse(storedUser);
          // Check if token is still valid (mock expiration check)
          const tokenPayload = JSON.parse(atob(storedToken.split('.')[1]));
          const currentTime = Math.floor(Date.now() / 1000);

          if (tokenPayload.exp > currentTime) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: { user, token: storedToken },
            });
          } else {
            // Token expired, clear storage
            localStorage.removeItem('accupay_token');
            localStorage.removeItem('accupay_user');
          }
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
        localStorage.removeItem('accupay_token');
        localStorage.removeItem('accupay_user');
      }
    };

    loadAuthState();
  }, []);

  // Save authentication state to localStorage
  useEffect(() => {
    if (state.isAuthenticated && state.user && state.token) {
      localStorage.setItem('accupay_token', state.token);
      localStorage.setItem('accupay_user', JSON.stringify(state.user));

      // Also save to cookies for middleware access
      document.cookie = `accupay_token=${state.token}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `accupay_user=${encodeURIComponent(JSON.stringify(state.user))}; path=/; max-age=86400; SameSite=Lax`;
    } else if (!state.isAuthenticated) {
      localStorage.removeItem('accupay_token');
      localStorage.removeItem('accupay_user');

      // Also remove from cookies
      document.cookie =
        'accupay_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie =
        'accupay_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }, [state.isAuthenticated, state.user, state.token]);

  // Login function
  const login = async (
    email: string,
    password: string,
    role?: string
  ): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user by email (password is hardcoded as 'password123' for demo)
      const user = mockUsers.find(u => u.email === email);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Check password (hardcoded for demo)
      if (password !== 'password123') {
        throw new Error('Invalid email or password');
      }

      // If role is specified, verify user has that role
      if (role && user.role !== role) {
        throw new Error(`User does not have the ${role} role`);
      }

      // Generate mock JWT token
      const token = generateMockToken(user);

      // Update user's last login
      user.lastLogin = new Date().toISOString();

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error instanceof Error ? error.message : 'Login failed',
      });
    }
  };

  // Logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Check if user has specific permission
  const hasPermission = (permission: string): boolean => {
    if (!state.user) return false;

    // Map string permissions to boolean permissions
    const permissionMap: Record<string, keyof User['permissions']> = {
      'read:all': 'canViewEmployees',
      'write:all': 'canEditEmployees',
      'delete:all': 'canDeleteEmployees',
      'read:payroll': 'canViewPayroll',
      'write:payroll': 'canEditPayroll',
      'read:reports': 'canViewReports',
      'read:analytics': 'canViewReports',
      'admin:all': 'canManageUsers',
      'admin:settings': 'canEditSettings',
    };

    const mappedPermission = permissionMap[permission];
    if (!mappedPermission) return false;

    return state.user.permissions[mappedPermission];
  };

  // Check if user has specific role
  const hasRole = (role: string): boolean => {
    if (!state.user) return false;
    return state.user.role === role;
  };

  const value: AuthContextType = {
    state,
    login,
    logout,
    clearError,
    hasPermission,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export mock users for login page
export { mockUsers, rolePermissions };
