package com.lab04.orchidmanagement.controllers;

import com.lab04.orchidmanagement.dto.ApiResponse;
import com.lab04.orchidmanagement.exception.OrchidNotFoundException;
import com.lab04.orchidmanagement.pojos.Orchid;
import com.lab04.orchidmanagement.repositories.IOrchidRepository;
import com.lab04.orchidmanagement.services.IOrchidService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/orchids")
public class OrchidController {

    private final IOrchidService service;
    private final IOrchidRepository repository;

    public OrchidController(IOrchidService service, IOrchidRepository repository) {
        this.service = service;
        this.repository = repository;
    }

    // GET /orchids/
    @GetMapping("/")
    public ResponseEntity<ApiResponse<List<Orchid>>> getAllOrchids() {
        List<Orchid> orchids = service.getAllOrchids();
        return ResponseEntity.ok(new ApiResponse<>(true, "Orchids retrieved successfully", orchids));
    }

    // POST /orchids/
    @PostMapping("/")
    public ResponseEntity<ApiResponse<Orchid>> createOrchid(@Valid @RequestBody Orchid orchid) {
        Orchid created = service.createOrchid(orchid);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Orchid created successfully", created));
    }

    // GET /orchids/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Orchid>> getOrchidById(@PathVariable Integer id) {
        Orchid orchid = service.getOrchidById(id)
                .orElseThrow(() -> new OrchidNotFoundException("Orchid not found with id: " + id));
        return ResponseEntity.ok(new ApiResponse<>(true, "Orchid retrieved successfully", orchid));
    }

    // PUT /orchids/{id}
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Orchid>> updateOrchid(
            @PathVariable Integer id, @Valid @RequestBody Orchid orchid) {
        Orchid updated = service.updateOrchid(id, orchid);
        return ResponseEntity.ok(new ApiResponse<>(true, "Orchid updated successfully", updated));
    }

    // DELETE /orchids/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrchid(@PathVariable Integer id) {
        service.deleteOrchid(id);
        return ResponseEntity.noContent().build();
    }

    // GET /orchids/search?name=&category=&isNatural=
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Orchid>>> searchOrchids(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean isNatural) {
        List<Orchid> results = repository.searchOrchids(name, category, isNatural);
        return ResponseEntity.ok(new ApiResponse<>(true, "Search results", results));
    }

    // GET /orchids/paged?page=0&size=5&sortBy=orchidId&direction=asc
    @GetMapping("/paged")
    public ResponseEntity<ApiResponse<Page<Orchid>>> getPagedOrchids(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "orchidId") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Page<Orchid> result = repository.findAll(PageRequest.of(page, size, sort));
        return ResponseEntity.ok(new ApiResponse<>(true, "Paged orchids retrieved", result));
    }

    // GET /orchids/categories
    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<String>>> getCategories() {
        List<String> categories = service.getAllOrchids().stream()
                .map(Orchid::getOrchidCategory)
                .filter(c -> c != null && !c.isBlank())
                .distinct()
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ApiResponse<>(true, "Categories retrieved", categories));
    }
}
