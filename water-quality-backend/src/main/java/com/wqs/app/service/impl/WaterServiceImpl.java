package com.wqs.app.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.wqs.app.dto.WaterRequest;
import com.wqs.app.entity.Alert;
import com.wqs.app.entity.ThresholdConfig;
import com.wqs.app.entity.WaterReading;
import com.wqs.app.repository.AlertRepository;
import com.wqs.app.repository.WaterReadingRepository;
import com.wqs.app.service.ConfigService; // Import ConfigService
import com.wqs.app.service.WaterService;

@Service
public class WaterServiceImpl implements WaterService {

    private final WaterReadingRepository repo;
    private final AlertRepository alertRepo;
    private final ConfigService configService; // Inject ConfigService

    public WaterServiceImpl(WaterReadingRepository repo, AlertRepository alertRepo, ConfigService configService) {
        this.repo = repo;
        this.alertRepo = alertRepo;
        this.configService = configService;
    }

    private String calculateQuality(double ph, double turbidity, double tds) {
        // Fetch dynamic thresholds
        ThresholdConfig config = configService.getThresholds();

        // Use defaults if config is missing to prevent errors
        double phMin = (config != null) ? config.getPhMin() : 6.5;
        double phMax = (config != null) ? config.getPhMax() : 8.5;
        double turbMax = (config != null) ? config.getTurbidityMax() : 5.0;
        double tdsMax = (config != null) ? config.getTdsMax() : 500.0;

        // Derive Critical Limits (Poor) based on logic from original code
        // Original: Poor if pH < 5.5 (1.0 below min) or > 9.0 (0.5 above max)
        double phCriticalLow = phMin - 1.0;
        double phCriticalHigh = phMax + 0.5;
        // Original: Poor if Turbidity > 10 (2x max) or TDS > 1000 (2x max)
        double turbCritical = turbMax * 2;
        double tdsCritical = tdsMax * 2;

        // 1. Check Poor (Critical)
        if (ph < phCriticalLow || ph > phCriticalHigh || turbidity > turbCritical || tds > tdsCritical)
            return "Poor";

        // 2. Check Moderate (Warning) - Inside critical but outside ideal
        if ((ph >= phCriticalLow && ph < phMin) || (ph > phMax && ph <= phCriticalHigh) || turbidity > turbMax
                || tds > tdsMax)
            return "Moderate";

        // 3. Otherwise Good
        return "Good";
    }

    @Override
    public WaterReading addReading(WaterRequest r) {
        WaterReading reading = new WaterReading();
        reading.setPh(r.getPh());
        reading.setTurbidity(r.getTurbidity());
        reading.setTds(r.getTds());
        reading.setTemperature(r.getTemperature());
        reading.setLocation(r.getLocation());

        String quality = calculateQuality(r.getPh(), r.getTurbidity(), r.getTds());
        reading.setQuality(quality);

        WaterReading saved = repo.save(reading);

        if ("Poor".equals(quality)) {
            Alert alert = new Alert();
            alert.setMessage("Critical contamination detected at " + r.getLocation());
            alert.setLocation(r.getLocation());
            alert.setQuality("Poor");
            alert.setReadStatus(false);
            alertRepo.save(alert);
        }

        return saved;
    }

    @Override
    public List<WaterReading> getAll() {
        return repo.findAll();
    }

    @Override
    public WaterReading getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public List<WaterReading> getByLocation(String location) {
        return repo.findByLocation(location);
    }

    @Override
    public List<WaterReading> getByDate(LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(23, 59, 59);
        return repo.findByTimestampBetween(start, end);
    }

    @Override
    public WaterReading updateReading(Long id, WaterRequest r) {
        WaterReading reading = repo.findById(id).orElse(null);
        if (reading == null)
            return null;

        reading.setPh(r.getPh());
        reading.setTurbidity(r.getTurbidity());
        reading.setTds(r.getTds());
        reading.setTemperature(r.getTemperature());
        reading.setLocation(r.getLocation());

        String quality = calculateQuality(r.getPh(), r.getTurbidity(), r.getTds());
        reading.setQuality(quality);

        if ("Poor".equals(quality)) {
            Alert alert = new Alert();
            alert.setMessage("Updated reading shows critical levels at " + r.getLocation());
            alert.setLocation(r.getLocation());
            alert.setQuality("Poor");
            alert.setReadStatus(false);
            alertRepo.save(alert);
        }

        return repo.save(reading);
    }

    @Override
    public String deleteById(Long id) {
        if (!repo.existsById(id))
            return "Water reading not found";
        repo.deleteById(id);
        return "Water reading deleted successfully";
    }
}