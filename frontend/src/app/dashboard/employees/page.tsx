'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { useEmployees } from '@/hooks/useEmployees';
import {
  Users,
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

type SortField =
  | 'name'
  | 'email'
  | 'department'
  | 'position'
  | 'hireDate'
  | 'salary';
type SortDirection = 'asc' | 'desc' | null;

export default function EmployeesPage() {
  const { employees } = useEmployees();
  const router = useRouter();

  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Sorting state
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter, search, sort, and paginate employees
  const filteredAndSortedEmployees = useMemo(() => {
    let result = [...employees];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        emp =>
          `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(query) ||
          emp.email.toLowerCase().includes(query) ||
          emp.id.toString().includes(query)
      );
    }

    // Apply department filter
    if (departmentFilter) {
      result = result.filter(
        emp => emp.department.toLowerCase() === departmentFilter.toLowerCase()
      );
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter(
        emp => emp.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply sorting
    if (sortField && sortDirection) {
      result.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortField) {
          case 'name':
            aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
            bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
            break;
          case 'email':
            aValue = a.email.toLowerCase();
            bValue = b.email.toLowerCase();
            break;
          case 'department':
            aValue = a.department.toLowerCase();
            bValue = b.department.toLowerCase();
            break;
          case 'position':
            aValue = a.position.toLowerCase();
            bValue = b.position.toLowerCase();
            break;
          case 'hireDate':
            aValue = new Date(a.hireDate).getTime();
            bValue = new Date(b.hireDate).getTime();
            break;
          case 'salary':
            aValue = a.salary;
            bValue = b.salary;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [
    employees,
    searchQuery,
    departmentFilter,
    statusFilter,
    sortField,
    sortDirection,
  ]);

  // Calculate pagination
  const totalPages = Math.ceil(
    filteredAndSortedEmployees.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = filteredAndSortedEmployees.slice(
    startIndex,
    endIndex
  );

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction or clear sort
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 ml-1 opacity-50" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="w-4 h-4 ml-1" />;
    }
    return <ArrowDown className="w-4 h-4 ml-1" />;
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'active' ? 'success' : 'secondary'}>
        {status}
      </Badge>
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get unique departments for filter dropdown
  const departments = useMemo(() => {
    const depts = new Set(employees.map(emp => emp.department));
    return Array.from(depts).sort();
  }, [employees]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mainTextColor">Employees</h1>
          <p className="text-bodyText">
            Manage your team members and their information
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard/employees/onboarding')}
          >
            <Users className="w-4 h-4 mr-2" />
            Start Onboarding
          </Button>
          <Button onClick={() => router.push('/dashboard/employees/new')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bodyText" />
              <Input
                placeholder="Search by name, email, or ID..."
                className="pl-10"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select
              placeholder="Department"
              className="w-40"
              value={departmentFilter}
              onChange={e => {
                setDepartmentFilter(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { value: '', label: 'All Departments' },
                ...departments.map(dept => ({ value: dept, label: dept })),
              ]}
            />
            <Select
              placeholder="Status"
              className="w-32"
              value={statusFilter}
              onChange={e => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { value: '', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
            {(searchQuery || departmentFilter || statusFilter) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setDepartmentFilter('');
                  setStatusFilter('');
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/dashboard/employees/bulk')}
          >
            <Download className="w-4 h-4 mr-2" />
            Bulk Operations
          </Button>
        </div>
        <p className="text-sm text-bodyText">
          Showing {startIndex + 1}-
          {Math.min(endIndex, filteredAndSortedEmployees.length)} of{' '}
          {filteredAndSortedEmployees.length} employees
          {filteredAndSortedEmployees.length !== employees.length &&
            ` (filtered from ${employees.length} total)`}
        </p>
      </div>

      {/* Employees Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-softBg border-b border-strokeColor">
              <tr>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center text-sm font-semibold text-mainTextColor hover:text-s1 transition-colors"
                  >
                    Name
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('email')}
                    className="flex items-center text-sm font-semibold text-mainTextColor hover:text-s1 transition-colors"
                  >
                    Email
                    {getSortIcon('email')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('department')}
                    className="flex items-center text-sm font-semibold text-mainTextColor hover:text-s1 transition-colors"
                  >
                    Department
                    {getSortIcon('department')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('position')}
                    className="flex items-center text-sm font-semibold text-mainTextColor hover:text-s1 transition-colors"
                  >
                    Position
                    {getSortIcon('position')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-mainTextColor">
                  Status
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('salary')}
                    className="flex items-center text-sm font-semibold text-mainTextColor hover:text-s1 transition-colors"
                  >
                    Salary
                    {getSortIcon('salary')}
                  </button>
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-mainTextColor">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-strokeColor">
              {paginatedEmployees.length > 0 ? (
                paginatedEmployees.map(employee => (
                  <tr
                    key={employee.id}
                    className="hover:bg-softBg transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-mainTextColor">
                        {employee.firstName} {employee.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-bodyText">
                      {employee.email}
                    </td>
                    <td className="px-6 py-4 text-bodyText">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 text-bodyText">
                      {employee.position}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(employee.status)}
                    </td>
                    <td className="px-6 py-4 text-bodyText">
                      ${employee.salary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          title="View Employee"
                          onClick={() =>
                            router.push(`/dashboard/employees/${employee.id}`)
                          }
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Edit Employee"
                          onClick={() =>
                            router.push(
                              `/dashboard/employees/${employee.id}/edit`
                            )
                          }
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Delete Employee"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-12 h-12 text-bodyText opacity-50" />
                      <p className="text-bodyText">No employees found</p>
                      {(searchQuery || departmentFilter || statusFilter) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSearchQuery('');
                            setDepartmentFilter('');
                            setStatusFilter('');
                            setCurrentPage(1);
                          }}
                        >
                          Clear Filters
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-strokeColor">
            <div className="text-sm text-bodyText">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className="w-10"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
