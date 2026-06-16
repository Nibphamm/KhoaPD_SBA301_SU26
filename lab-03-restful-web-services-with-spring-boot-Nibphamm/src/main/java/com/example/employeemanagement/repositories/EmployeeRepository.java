package com.example.employeemanagement.repositories;

import com.example.employeemanagement.pojos.Employee;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
public class EmployeeRepository implements IEmployeeRepository {

    private final List<Employee> employees = new ArrayList<>();

    public EmployeeRepository() {
        employees.add(new Employee("E001", "Alice Johnson", "Manager", 75000));
        employees.add(new Employee("E002", "Bob Smith", "Developer", 60000));
        employees.add(new Employee("E003", "Carol White", "Designer", 55000));
        employees.add(new Employee("E004", "David Brown", "Tester", 50000));
        employees.add(new Employee("E005", "Eve Davis", "Analyst", 65000));
    }

    @Override
    public List<Employee> getAllEmployees() {
        return new ArrayList<>(employees);
    }

    @Override
    public Employee getEmployeeById(String empId) {
        return employees.stream()
                .filter(e -> e.getEmpId().equals(empId))
                .findFirst()
                .orElse(null);
    }

    @Override
    public Employee create(Employee employee) {
        employees.add(employee);
        return employee;
    }

    @Override
    public Employee delete(int id) {
        return employees.remove(id);
    }

    @Override
    public Employee update(String empId, Employee updatedEmployee) {
        for (int i = 0; i < employees.size(); i++) {
            if (employees.get(i).getEmpId().equals(empId)) {
                updatedEmployee.setEmpId(empId);
                employees.set(i, updatedEmployee);
                return updatedEmployee;
            }
        }
        return null;
    }

    @Override
    public List<Employee> search(String keyword) {
        String lower = keyword.toLowerCase();
        return employees.stream()
                .filter(e -> e.getName().toLowerCase().contains(lower)
                          || e.getDesignation().toLowerCase().contains(lower))
                .collect(Collectors.toList());
    }

    @Override
    public Iterable<Employee> findAll(Sort sort) {
        List<Employee> sorted = new ArrayList<>(employees);
        for (Sort.Order order : sort) {
            sorted.sort((a, b) -> {
                int cmp = compareByField(a, b, order.getProperty());
                return order.isAscending() ? cmp : -cmp;
            });
        }
        return sorted;
    }

    @Override
    public Page<Employee> findAll(Pageable pageable) {
        List<Employee> sorted = new ArrayList<>(employees);
        if (pageable.getSort().isSorted()) {
            for (Sort.Order order : pageable.getSort()) {
                sorted.sort((a, b) -> {
                    int cmp = compareByField(a, b, order.getProperty());
                    return order.isAscending() ? cmp : -cmp;
                });
            }
        }
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), sorted.size());
        List<Employee> content = start >= sorted.size()
                ? Collections.emptyList()
                : sorted.subList(start, end);
        return new PageImpl<>(content, pageable, sorted.size());
    }

    private int compareByField(Employee a, Employee b, String field) {
        return switch (field) {
            case "empId"       -> a.getEmpId().compareTo(b.getEmpId());
            case "name"        -> a.getName().compareTo(b.getName());
            case "designation" -> a.getDesignation().compareTo(b.getDesignation());
            case "salary"      -> Double.compare(a.getSalary(), b.getSalary());
            default            -> 0;
        };
    }
}
