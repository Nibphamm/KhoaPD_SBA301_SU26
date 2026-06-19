package com.lab05.orchidmanagement.controllers;

import com.lab05.orchidmanagement.pojos.Orchid;
import com.lab05.orchidmanagement.services.IOrchidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orchids")
@CrossOrigin(origins = "http://localhost:5173")
public class OrchidController {

    @Autowired
    private IOrchidService orchidService;

    @GetMapping("/")
    public ResponseEntity<List<Orchid>> getAllOrchids() {
        return ResponseEntity.ok(orchidService.getAllOrchids());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orchid> getOrchidById(@PathVariable Integer id) {
        Optional<Orchid> orchid = orchidService.getOrchidById(id);
        return orchid.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public ResponseEntity<Orchid> createOrchid(@RequestBody Orchid orchid) {
        Orchid created = orchidService.createOrchid(orchid);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orchid> updateOrchid(@PathVariable Integer id, @RequestBody Orchid orchid) {
        if (!orchidService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        Orchid updated = orchidService.updateOrchid(id, orchid);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrchid(@PathVariable Integer id) {
        if (!orchidService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        orchidService.deleteOrchid(id);
        return ResponseEntity.noContent().build();
    }
}
