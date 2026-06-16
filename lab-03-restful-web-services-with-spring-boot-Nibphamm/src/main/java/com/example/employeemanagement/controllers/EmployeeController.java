package com.example.employeemanagement.controllers;

import com.example.employeemanagement.pojos.ApiResponse;
import com.example.employeemanagement.pojos.Employee;
import com.example.employeemanagement.services.IEmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@Tag(name = "Employee Management", description = "APIs for managing employees")
public class EmployeeController {

    private final IEmployeeService employeeService;

    public EmployeeController(IEmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    @Operation(summary = "Get all employees with paging and sorting",
               description = "Returns a paginated and sorted list of employees")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Employees retrieved successfully")
    })
    public ResponseEntity<ApiResponse<Page<Employee>>> getAllEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "empId") String sortBy) {
        Page<Employee> result = employeeService.getEmployeesWithPaging(page, size, sortBy);
        return ResponseEntity.ok(ApiResponse.success("Employees retrieved successfully", result));
    }

    @GetMapping("/search")
    @Operation(summary = "Search employees by keyword",
               description = "Case-insensitive search by name or designation")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Search completed")
    })
    public ResponseEntity<ApiResponse<List<Employee>>> searchEmployees(@RequestParam String keyword) {
        List<Employee> results = employeeService.searchEmployees(keyword);
        return ResponseEntity.ok(ApiResponse.success("Search completed", results));
    }

    @GetMapping("/{empId}")
    @Operation(summary = "Get employee by ID",
               description = "Returns a single employee by their empId")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Employee found"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Employee not found")
    })
    public ResponseEntity<ApiResponse<Employee>> getEmployeeById(@PathVariable String empId) {
        Employee employee = employeeService.getEmployeeById(empId);
        return ResponseEntity.ok(ApiResponse.success("Employee found", employee));
    }

    @PostMapping
    @Operation(summary = "Create a new employee",
               description = "Creates a new employee and returns it with status 201")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Employee created"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<ApiResponse<Employee>> createEmployee(@Valid @RequestBody Employee employee) {
        Employee created = employeeService.createEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Employee created successfully", created));
    }

    @PutMapping("/{empId}")
    @Operation(summary = "Update an employee",
               description = "Updates an existing employee by their empId")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Employee updated"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Employee not found"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<ApiResponse<Employee>> updateEmployee(
            @PathVariable String empId,
            @Valid @RequestBody Employee employee) {
        Employee updated = employeeService.updateEmployee(empId, employee);
        return ResponseEntity.ok(ApiResponse.success("Employee updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete employee by index",
               description = "Deletes an employee by their list index and returns the deleted employee")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Employee deleted"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid index")
    })
    public ResponseEntity<ApiResponse<Employee>> deleteEmployee(@PathVariable int id) {
        Employee deleted = employeeService.deleteEmployee(id);
        return ResponseEntity.ok(ApiResponse.success("Employee deleted successfully", deleted));
    }
}
