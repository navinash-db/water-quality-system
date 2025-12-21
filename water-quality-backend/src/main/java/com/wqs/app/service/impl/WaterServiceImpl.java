package com.wqs.app.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // <--- 1. IMPORT THIS

import com.wqs.app.dto.WaterRequest;
import com.wqs.app.entity.Alert;
import com.wqs.app.entity.ThresholdConfig;
import com.wqs.app.entity.WaterReading;
import com.wqs.app.repository.AlertRepository;
import com.wqs.app.repository.WaterReadingRepository;
import com.wqs.app.service.ConfigService;
import com.wqs.app.service.WaterService;

@Service
public class WaterServiceImpl implements WaterService {

    private final WaterReadingRepository repo;
    private final AlertRepository alertRepo;
    private final ConfigService configService;

    public WaterServiceImpl(WaterReadingRepository repo, AlertRepository alertRepo, ConfigService configService) {
        this.repo = repo;
        this.alertRepo = alertRepo;
        this.configService = configService;
    }

    // Helper to get Thresholds safely
    private ThresholdConfig getConfig() {
        ThresholdConfig config = configService.getThresholds();
        if (config == null) {
            config = new ThresholdConfig();
            config.setPhMin(6.5);
            config.setPhMax(8.5);
            config.setTurbidityMax(5.0);
            config.setTdsMax(500.0);
        }
        return config;
    }

    private String calculateQuality(double ph, double turbidity, double tds) {
        ThresholdConfig config = getConfig();

        double phCriticalLow = config.getPhMin() - 1.0;
        double phCriticalHigh = config.getPhMax() + 0.5;
        double turbCritical = config.getTurbidityMax() * 2;
        double tdsCritical = config.getTdsMax() * 2;

        // 1. Check Poor (Critical)
        if (ph < phCriticalLow || ph > phCriticalHigh || turbidity > turbCritical || tds > tdsCritical)
            return "Poor";

        // 2. Check Moderate (Warning)
        if ((ph >= phCriticalLow && ph < config.getPhMin()) ||
                (ph > config.getPhMax() && ph <= phCriticalHigh) ||
                turbidity > config.getTurbidityMax() ||
                tds > config.getTdsMax())
            return "Moderate";

        return "Good";
    }

    // NEW: Generate a specific message based on the worst offender
    private String generateAlertMessage(double ph, double turbidity, double tds) {
        ThresholdConfig config = getConfig();

        double phCriticalLow = config.getPhMin() - 1.0;
        double phCriticalHigh = config.getPhMax() + 0.5;
        double turbCritical = config.getTurbidityMax() * 2;
        double tdsCritical = config.getTdsMax() * 2;

        if (ph < phCriticalLow)
            return "Critical: Water is too Acidic (pH " + ph + ")";
        if (ph > phCriticalHigh)
            return "Critical: Water is too Alkaline (pH " + ph + ")";
        if (turbidity > turbCritical)
            return "Critical: Water is very cloudy (" + turbidity + " NTU)";
        if (tds > tdsCritical)
            return "Critical: High Contamination (" + tds + " ppm)";

        return "Critical contamination detected";
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

        // Save FIRST to generate the ID
        WaterReading saved = repo.save(reading);

        if ("Poor".equals(quality)) {
            Alert alert = new Alert();

            String specificMsg = generateAlertMessage(r.getPh(), r.getTurbidity(), r.getTds());

            // --- 2. NEW LINKING LOGIC ---
            alert.setReadingId(saved.getId());
            // ----------------------------

            alert.setMessage(specificMsg + " at " + r.getLocation());
            alert.setLocation(r.getLocation());
            alert.setQuality("Poor");
            alert.setReadStatus(false);
            alertRepo.save(alert);
        }

        return saved;
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

            String specificMsg = generateAlertMessage(r.getPh(), r.getTurbidity(), r.getTds());

            // --- 3. LINK ON UPDATE TOO ---
            alert.setReadingId(reading.getId());
            // -----------------------------

            alert.setMessage("Update: " + specificMsg + " at " + r.getLocation());
            alert.setLocation(r.getLocation());
            alert.setQuality("Poor");
            alert.setReadStatus(false);
            alertRepo.save(alert);
        }

        return repo.save(reading);
    }

    @Override
    @Transactional // <--- 4. REQUIRED FOR DELETE
    public String deleteById(Long id) {
        if (!repo.existsById(id))
            return "Water reading not found";

        // --- 5. DELETE LINKED ALERTS FIRST ---
        alertRepo.deleteByReadingId(id);
        // -------------------------------------

        repo.deleteById(id);
        return "Water reading and associated alerts deleted successfully";
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
}