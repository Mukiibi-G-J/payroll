import { useEmployees as useEmployeeContext } from '@/context/EmployeeContext';
import { Employee } from '@/data/employees';

export const useEmployees = () => {
  const {
    state,
    getEmployeeById,
    getEmployeesByDepartment,
    getActiveEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployeeContext();

  return {
    employees: state.employees,
    loading: state.loading,
    error: state.error,
    getEmployeeById,
    getEmployeesByDepartment,
    getActiveEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
};

export const useEmployee = (id: number) => {
  const { getEmployeeById } = useEmployeeContext();
  return getEmployeeById(id);
};

export const useEmployeesByDepartment = (department: string) => {
  const { getEmployeesByDepartment } = useEmployeeContext();
  return getEmployeesByDepartment(department);
};

export const useActiveEmployees = () => {
  const { getActiveEmployees } = useEmployeeContext();
  return getActiveEmployees();
};
