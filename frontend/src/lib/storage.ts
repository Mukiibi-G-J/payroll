// Local storage utilities for prototype data persistence

export const STORAGE_KEYS = {
  EMPLOYEES: 'accupay_employees',
  PAYROLL_PERIODS: 'accupay_payroll_periods',
  PAYROLL_ENTRIES: 'accupay_payroll_entries',
  PAYROLL_SUMMARIES: 'accupay_payroll_summaries',
  TIME_ENTRIES: 'accupay_time_entries',
  TIMESHEETS: 'accupay_timesheets',
  LEAVE_REQUESTS: 'accupay_leave_requests',
  USERS: 'accupay_users',
  CURRENT_USER: 'accupay_current_user',
  COMPANY: 'accupay_company',
} as const;

export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save to localStorage:`, error);
  }
};

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Failed to load from localStorage:`, error);
    return defaultValue;
  }
};

export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove from localStorage:`, error);
  }
};

export const clearAllStorage = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error(`Failed to clear localStorage:`, error);
  }
};

// Initialize storage with mock data if not present
export const initializeStorage = () => {
  // This function can be called to reset all data to initial mock values
  // Useful for development and testing
  clearAllStorage();
  console.log('Storage cleared and ready for fresh data');
};
