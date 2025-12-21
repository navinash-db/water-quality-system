package com.wqs.app.controller;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import com.wqs.app.dto.WaterRequest;
import com.wqs.app.entity.WaterReading;
import com.wqs.app.service.WaterService;

@RestController
@RequestMapping("/api/water-readings")
// @CrossOrigin(origins = "*") <-- REMOVE THIS LINE. It conflicts with
// WebCorsConfig.
public class WaterController {

    private final WaterService service;

    public WaterController(WaterService service) {
        this.service = service;
    }

    // ADD WATER READING
    @PostMapping
    public WaterReading add(@Valid @RequestBody WaterRequest req) {
        return service.addReading(req);
    }

    // GET ALL READINGS
    @GetMapping
    public List<WaterReading> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public WaterReading getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/location/{location}")
    public List<WaterReading> getByLocation(@PathVariable String location) {
        return service.getByLocation(location);
    }

    @GetMapping("/date")
    public List<WaterReading> getByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return service.getByDate(date);
    }

    @PutMapping("/{id}")
    public WaterReading update(
            @PathVariable Long id,
            @Valid @RequestBody WaterRequest request) {

        return service.updateReading(id, request);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        return service.deleteById(id);
    }
}