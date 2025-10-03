import { useUser as useUserContext } from '@/context/UserContext';
import { User } from '@/data/users';

export const useUser = () => {
  const {
    state,
    login,
    logout,
    getUserById,
    getUsersByRole,
    getActiveUsers,
    getUsersByDepartment,
    hasPermission,
    updateCurrentUser,
  } = useUserContext();

  return {
    currentUser: state.currentUser,
    users: state.users,
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
    getUserById,
    getUsersByRole,
    getActiveUsers,
    getUsersByDepartment,
    hasPermission,
    updateCurrentUser,
  };
};

export const useCurrentUser = () => {
  const { currentUser } = useUserContext();
  return currentUser;
};

export const usePermissions = () => {
  const { hasPermission } = useUserContext();
  return { hasPermission };
};

export const useAuth = () => {
  const { login, logout, isAuthenticated, currentUser } = useUserContext();
  return { login, logout, isAuthenticated, currentUser };
};
