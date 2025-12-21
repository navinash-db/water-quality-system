package com.wqs.app.service.impl;

import org.springframework.stereotype.Service;

import com.wqs.app.dto.ThresholdRequest;
import com.wqs.app.entity.ThresholdConfig;
import com.wqs.app.repository.ThresholdConfigRepository;
import com.wqs.app.service.ConfigService;

@Service
public class ConfigServiceImpl implements ConfigService {

    private final ThresholdConfigRepository repo;

    public ConfigServiceImpl(ThresholdConfigRepository repo) {
        this.repo = repo;
    }

    @Override
    public ThresholdConfig getThresholds() {
        // FIX: If no config exists, create default values immediately
        return repo.findAll().stream().findFirst()
                .orElseGet(this::createDefaultConfig);
    }

    @Override
    public ThresholdConfig updateThresholds(ThresholdRequest request) {
        // Get existing or create new
        ThresholdConfig config = repo.findAll().stream().findFirst()
                .orElse(new ThresholdConfig());

        config.setPhMin(request.getPhMin());
        config.setPhMax(request.getPhMax());
        config.setTurbidityMax(request.getTurbidityMax());
        config.setTdsMax(request.getTdsMax());

        return repo.save(config);
    }

    @Override
    public ThresholdConfig resetThresholds() {
        return createDefaultConfig();
    }

    // --- HELPER METHOD ---
    private ThresholdConfig createDefaultConfig() {
        // Check if one exists to overwrite, or create new
        ThresholdConfig config = repo.findAll().stream().findFirst()
                .orElse(new ThresholdConfig());

        // Set Standard Defaults
        config.setPhMin(6.5);
        config.setPhMax(8.5);
        config.setTurbidityMax(5.0);
        config.setTdsMax(500.0);

        return repo.save(config);
    }
}