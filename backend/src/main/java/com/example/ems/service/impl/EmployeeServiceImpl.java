package com.example.ems.service.impl;

import com.example.ems.dto.EmployeeDto;
import com.example.ems.entity.Department;
import com.example.ems.entity.Employee;
import com.example.ems.exception.ResourceNotFoundException;
import com.example.ems.repository.DepartmentRepository;
import com.example.ems.repository.EmployeeRepository;
import com.example.ems.service.EmployeeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Department department = departmentRepository.findById(employeeDto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + employeeDto.getDepartmentId()));

        Employee employee = mapToEntity(employeeDto);
        employee.setDepartment(department);
        if (employee.getHireDate() == null) {
            employee.setHireDate(LocalDate.now());
        }

        Employee saved = employeeRepository.save(employee);
        return mapToDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        return mapToDto(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeDto> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto employeeDto) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));

        Department department = departmentRepository.findById(employeeDto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + employeeDto.getDepartmentId()));

        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        employee.setRole(employeeDto.getRole());
        employee.setSalary(employeeDto.getSalary());
        employee.setStatus(employeeDto.getStatus() != null ? employeeDto.getStatus() : "ACTIVE");
        if (employeeDto.getHireDate() != null) {
            employee.setHireDate(employeeDto.getHireDate());
        }
        employee.setDepartment(department);

        Employee updated = employeeRepository.save(employee);
        return mapToDto(updated);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        employeeRepository.delete(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeDto> searchEmployees(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllEmployees();
        }
        return employeeRepository.searchEmployees(query.trim()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeDto> getEmployeesByDepartment(Long departmentId) {
        return employeeRepository.findByDepartmentId(departmentId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getDashboardStats() {
        long totalEmployees = employeeRepository.count();
        long activeEmployees = employeeRepository.countByStatus("ACTIVE");
        long inactiveEmployees = employeeRepository.countByStatus("INACTIVE");
        long totalDepartments = departmentRepository.count();
        BigDecimal avgSalary = employeeRepository.findAverageSalary();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalEmployees", totalEmployees);
        stats.put("activeEmployees", activeEmployees);
        stats.put("inactiveEmployees", inactiveEmployees);
        stats.put("totalDepartments", totalDepartments);
        stats.put("averageSalary", avgSalary != null ? avgSalary.setScale(2, RoundingMode.HALF_UP) : BigDecimal.ZERO);
        return stats;
    }

    private EmployeeDto mapToDto(Employee employee) {
        EmployeeDto dto = new EmployeeDto();
        dto.setId(employee.getId());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setEmail(employee.getEmail());
        dto.setRole(employee.getRole());
        dto.setSalary(employee.getSalary());
        dto.setStatus(employee.getStatus());
        dto.setHireDate(employee.getHireDate());
        if (employee.getDepartment() != null) {
            dto.setDepartmentId(employee.getDepartment().getId());
            dto.setDepartmentName(employee.getDepartment().getDepartmentName());
        }
        return dto;
    }

    private Employee mapToEntity(EmployeeDto dto) {
        Employee employee = new Employee();
        employee.setId(dto.getId());
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setRole(dto.getRole());
        employee.setSalary(dto.getSalary());
        employee.setStatus(dto.getStatus() != null ? dto.getStatus() : "ACTIVE");
        employee.setHireDate(dto.getHireDate());
        return employee;
    }
}
