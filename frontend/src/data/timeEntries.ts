export interface TimeEntry {
  id: number;
  employeeId: number;
  employeeName: string;
  department: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  breakStart?: string;
  breakEnd?: string;
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  status: 'pending' | 'approved' | 'rejected' | 'submitted';
  notes?: string;
  approvedBy?: number;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Timesheet {
  id: number;
  employeeId: number;
  employeeName: string;
  department: string;
  weekStart: string;
  weekEnd: string;
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedAt?: string;
  approvedBy?: number;
  approvedAt?: string;
  entries: TimeEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  department: string;
  leaveType: 'vacation' | 'sick' | 'personal' | 'bereavement' | 'jury_duty';
  startDate: string;
  endDate: string;
  totalDays: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  reason: string;
  requestedAt: string;
  approvedBy?: number;
  approvedAt?: string;
  rejectedReason?: string;
  createdAt: string;
  updatedAt: string;
}

export const mockTimeEntries: TimeEntry[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Smith',
    department: 'Engineering',
    date: '2024-01-15',
    clockIn: '09:00',
    clockOut: '17:30',
    breakStart: '12:00',
    breakEnd: '13:00',
    totalHours: 8.5,
    regularHours: 8.0,
    overtimeHours: 0.5,
    status: 'approved',
    notes: 'Working on project deadline',
    approvedBy: 5,
    approvedAt: '2024-01-15T18:00:00Z',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T18:00:00Z',
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    department: 'HR',
    date: '2024-01-15',
    clockIn: '08:30',
    clockOut: '18:00',
    breakStart: '12:00',
    breakEnd: '13:00',
    totalHours: 9.5,
    regularHours: 8.0,
    overtimeHours: 1.5,
    status: 'pending',
    notes: 'HR training session',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T18:00:00Z',
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Mike Wilson',
    department: 'Finance',
    date: '2024-01-15',
    clockIn: '09:15',
    clockOut: '17:45',
    breakStart: '12:00',
    breakEnd: '13:00',
    totalHours: 8.5,
    regularHours: 8.0,
    overtimeHours: 0.5,
    status: 'approved',
    notes: 'Month-end closing',
    approvedBy: 6,
    approvedAt: '2024-01-15T18:30:00Z',
    createdAt: '2024-01-15T09:15:00Z',
    updatedAt: '2024-01-15T18:30:00Z',
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: 'Emily Davis',
    department: 'Marketing',
    date: '2024-01-15',
    clockIn: '09:00',
    clockOut: '16:30',
    breakStart: '12:00',
    breakEnd: '13:00',
    totalHours: 7.5,
    regularHours: 7.5,
    overtimeHours: 0,
    status: 'rejected',
    notes: 'Left early for appointment',
    rejectedReason: 'Insufficient notice for early departure',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T17:00:00Z',
  },
  {
    id: 5,
    employeeId: 1,
    employeeName: 'John Smith',
    department: 'Engineering',
    date: '2024-01-16',
    clockIn: '08:45',
    clockOut: '18:15',
    breakStart: '12:00',
    breakEnd: '13:00',
    totalHours: 9.5,
    regularHours: 8.0,
    overtimeHours: 1.5,
    status: 'approved',
    notes: 'Bug fixes and testing',
    approvedBy: 5,
    approvedAt: '2024-01-16T19:00:00Z',
    createdAt: '2024-01-16T08:45:00Z',
    updatedAt: '2024-01-16T19:00:00Z',
  },
  {
    id: 6,
    employeeId: 8,
    employeeName: 'Jennifer Taylor',
    department: 'Sales',
    date: '2024-01-15',
    clockIn: '08:00',
    clockOut: '17:00',
    breakStart: '12:00',
    breakEnd: '13:00',
    totalHours: 9.0,
    regularHours: 8.0,
    overtimeHours: 1.0,
    status: 'submitted',
    notes: 'Client meetings and follow-ups',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T17:00:00Z',
  },
];

export const mockTimesheets: Timesheet[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Smith',
    department: 'Engineering',
    weekStart: '2024-01-15',
    weekEnd: '2024-01-21',
    totalHours: 42.5,
    regularHours: 40.0,
    overtimeHours: 2.5,
    status: 'approved',
    submittedAt: '2024-01-21T17:00:00Z',
    approvedBy: 5,
    approvedAt: '2024-01-22T09:00:00Z',
    entries: mockTimeEntries.filter(
      entry =>
        entry.employeeId === 1 &&
        entry.date >= '2024-01-15' &&
        entry.date <= '2024-01-21'
    ),
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-22T09:00:00Z',
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    department: 'HR',
    weekStart: '2024-01-15',
    weekEnd: '2024-01-21',
    totalHours: 45.0,
    regularHours: 40.0,
    overtimeHours: 5.0,
    status: 'submitted',
    submittedAt: '2024-01-21T17:30:00Z',
    entries: mockTimeEntries.filter(
      entry =>
        entry.employeeId === 2 &&
        entry.date >= '2024-01-15' &&
        entry.date <= '2024-01-21'
    ),
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-21T17:30:00Z',
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Mike Wilson',
    department: 'Finance',
    weekStart: '2024-01-15',
    weekEnd: '2024-01-21',
    totalHours: 40.0,
    regularHours: 40.0,
    overtimeHours: 0,
    status: 'approved',
    submittedAt: '2024-01-21T17:15:00Z',
    approvedBy: 6,
    approvedAt: '2024-01-22T10:00:00Z',
    entries: mockTimeEntries.filter(
      entry =>
        entry.employeeId === 3 &&
        entry.date >= '2024-01-15' &&
        entry.date <= '2024-01-21'
    ),
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z',
  },
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Smith',
    department: 'Engineering',
    leaveType: 'vacation',
    startDate: '2024-02-15',
    endDate: '2024-02-19',
    totalDays: 5,
    status: 'approved',
    reason: 'Family vacation',
    requestedAt: '2024-01-10T10:00:00Z',
    approvedBy: 5,
    approvedAt: '2024-01-12T14:30:00Z',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    department: 'HR',
    leaveType: 'sick',
    startDate: '2024-01-20',
    endDate: '2024-01-20',
    totalDays: 1,
    status: 'approved',
    reason: 'Doctor appointment',
    requestedAt: '2024-01-19T16:00:00Z',
    approvedBy: 5,
    approvedAt: '2024-01-19T16:30:00Z',
    createdAt: '2024-01-19T16:00:00Z',
    updatedAt: '2024-01-19T16:30:00Z',
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Mike Wilson',
    department: 'Finance',
    leaveType: 'personal',
    startDate: '2024-02-01',
    endDate: '2024-02-02',
    totalDays: 2,
    status: 'pending',
    reason: 'Personal matters',
    requestedAt: '2024-01-25T09:00:00Z',
    createdAt: '2024-01-25T09:00:00Z',
    updatedAt: '2024-01-25T09:00:00Z',
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: 'Emily Davis',
    department: 'Marketing',
    leaveType: 'bereavement',
    startDate: '2024-01-18',
    endDate: '2024-01-22',
    totalDays: 5,
    status: 'approved',
    reason: 'Family funeral',
    requestedAt: '2024-01-17T11:00:00Z',
    approvedBy: 7,
    approvedAt: '2024-01-17T11:30:00Z',
    createdAt: '2024-01-17T11:00:00Z',
    updatedAt: '2024-01-17T11:30:00Z',
  },
];

export const getTimeEntriesByEmployee = (employeeId: number): TimeEntry[] => {
  return mockTimeEntries.filter(entry => entry.employeeId === employeeId);
};

export const getTimeEntriesByDate = (date: string): TimeEntry[] => {
  return mockTimeEntries.filter(entry => entry.date === date);
};

export const getTimeEntriesByStatus = (
  status: TimeEntry['status']
): TimeEntry[] => {
  return mockTimeEntries.filter(entry => entry.status === status);
};

export const getTimesheetByEmployee = (
  employeeId: number,
  weekStart: string
): Timesheet | undefined => {
  return mockTimesheets.find(
    sheet => sheet.employeeId === employeeId && sheet.weekStart === weekStart
  );
};

export const getPendingTimesheets = (): Timesheet[] => {
  return mockTimesheets.filter(sheet => sheet.status === 'submitted');
};

export const getLeaveRequestsByEmployee = (
  employeeId: number
): LeaveRequest[] => {
  return mockLeaveRequests.filter(request => request.employeeId === employeeId);
};

export const getPendingLeaveRequests = (): LeaveRequest[] => {
  return mockLeaveRequests.filter(request => request.status === 'pending');
};

export const getLeaveRequestsByStatus = (
  status: LeaveRequest['status']
): LeaveRequest[] => {
  return mockLeaveRequests.filter(request => request.status === status);
};
