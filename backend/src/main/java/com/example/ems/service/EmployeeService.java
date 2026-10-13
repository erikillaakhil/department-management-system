package com.example.ems.service;

import com.example.ems.dto.EmployeeDto;
import java.util.List;
import java.util.Map;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Long employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto employeeDto);
    void deleteEmployee(Long employeeId);
    List<EmployeeDto> searchEmployees(String query);
    List<EmployeeDto> getEmployeesByDepartment(Long departmentId);
    Map<String, Object> getDashboardStats();
}
