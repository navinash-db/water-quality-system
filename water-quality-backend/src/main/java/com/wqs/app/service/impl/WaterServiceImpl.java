package com.wqs.app.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.wqs.app.dto.WaterRequest;
import com.wqs.app.entity.Alert;
import com.wqs.app.entity.WaterReading;
import com.wqs.app.repository.AlertRepository;
import com.wqs.app.repository.WaterReadingRepository;
import com.wqs.app.service.WaterService;

@Service
public class WaterServiceImpl implements WaterService {

    private final WaterReadingRepository repo;
    private final AlertRepository alertRepo;

    public WaterServiceImpl(WaterReadingRepository repo, AlertRepository alertRepo) {
        this.repo = repo;
        this.alertRepo = alertRepo;
    }

    private String calculateQuality(double ph, double turbidity, double tds) {
        if (ph < 5.5 || ph > 9.0 || turbidity > 10 || tds > 1000)
            return "Poor";
        if ((ph >= 5.5 && ph < 6.5) || (ph > 8.0 && ph <= 9.0) || turbidity > 5 || tds > 500)
            return "Moderate";
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

        // AUTOMATIC ALERT GENERATION
        if ("Poor".equals(quality)) {
            Alert alert = new Alert();
            // Match the fields in YOUR Alert.java
            alert.setMessage("Critical contamination detected at " + r.getLocation());
            alert.setLocation(r.getLocation());
            alert.setQuality("Poor");
            alert.setReadStatus(false);
            // Timestamp is set automatically in Alert.java, so we don't set it here

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

        // Check for alert on update too
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