package com.wqs.app.controller;

import java.util.List;

// 1. Add this import
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wqs.app.dto.WaterRequest;
import com.wqs.app.entity.WaterReading;
import com.wqs.app.service.WaterService;

@RestController
@RequestMapping("/water")
@CrossOrigin(origins = "http://localhost:4200") // 2. Add this line
public class WaterController {

    private final WaterService service;

    public WaterController(WaterService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public WaterReading add(@RequestBody WaterRequest req) {
        return service.addReading(req);
    }

    @GetMapping("/all")
    public List<WaterReading> getAll() {
        return service.getAll();
    }
}