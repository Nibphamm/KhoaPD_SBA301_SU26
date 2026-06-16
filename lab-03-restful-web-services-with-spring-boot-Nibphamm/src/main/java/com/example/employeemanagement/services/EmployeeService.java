package com.example.employeemanagement.services;

import com.example.employeemanagement.exceptions.EmployeeNotFoundException;
import com.example.employeemanagement.pojos.Employee;
import com.example.employeemanagement.repositories.IEmployeeRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService implements IEmployeeService {

    private final IEmployeeRepository employeeRepository;

    public EmployeeService(IEmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.getAllEmployees();
    }

    @Override
    public Employee getEmployeeById(String empId) {
        Employee employee = employeeRepository.getEmployeeById(empId);
        if (employee == null) {
            throw new EmployeeNotFoundException("Employee not found with id: " + empId);
        }
        return employee;
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.create(employee);
    }

    @Override
    public Employee deleteEmployee(int id) {
        try {
            return employeeRepository.delete(id);
        } catch (IndexOutOfBoundsException e) {
            throw new IllegalArgumentException("Invalid index: " + id);
        }
    }

    @Override
    public Page<Employee> getEmployeesWithPaging(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return employeeRepository.findAll(pageable);
    }

    @Override
    public Employee updateEmployee(String empId, Employee updatedEmployee) {
        Employee existing = employeeRepository.getEmployeeById(empId);
        if (existing == null) {
            throw new EmployeeNotFoundException("Employee not found with id: " + empId);
        }
        return employeeRepository.update(empId, updatedEmployee);
    }

    @Override
    public List<Employee> searchEmployees(String keyword) {
        return employeeRepository.search(keyword);
    }
}
