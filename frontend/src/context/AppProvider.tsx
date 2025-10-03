'use client';

import React, { ReactNode } from 'react';
import { EmployeeProvider } from './EmployeeContext';
import { PayrollProvider } from './PayrollContext';
import { TimeTrackingProvider } from './TimeTrackingContext';
import { UserProvider } from './UserContext';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <UserProvider>
      <EmployeeProvider>
        <PayrollProvider>
          <TimeTrackingProvider>{children}</TimeTrackingProvider>
        </PayrollProvider>
      </EmployeeProvider>
    </UserProvider>
  );
};
