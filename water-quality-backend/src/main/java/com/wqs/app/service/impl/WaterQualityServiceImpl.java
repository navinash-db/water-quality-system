package com.wqs.app.service.impl;

import org.springframework.stereotype.Service;
import com.wqs.app.dto.WaterQualityResponse;
import com.wqs.app.entity.WaterReading;
import com.wqs.app.repository.WaterReadingRepository;
import com.wqs.app.service.WaterQualityService;

@Service
public class WaterQualityServiceImpl implements WaterQualityService {

    private final WaterReadingRepository repo;

    public WaterQualityServiceImpl(WaterReadingRepository repo) {
        this.repo = repo;
    }

    @Override
    public WaterQualityResponse evaluate(Long id) {
        WaterReading r = repo.findById(id).orElse(null);

        if (r == null) {
            return new WaterQualityResponse("UNKNOWN", "Reading not found");
        }

        String quality = "Good";
        String remarks = "Water is safe for use";

        // 1. CRITICAL CHECKS (POOR) - Any one of these makes water unsafe
        if (r.getPh() < 5.5 || r.getPh() > 9.0) {
            quality = "Poor";
            remarks = "Critical: pH is dangerous (" + r.getPh() + ")";
        } else if (r.getTurbidity() > 10) {
            quality = "Poor";
            remarks = "Critical: Water is very cloudy";
        } else if (r.getTds() > 1000) {
            quality = "Poor";
            remarks = "Critical: High contaminant level";
        }

        // 2. WARNING CHECKS (MODERATE) - Only check if not already Poor
        else if ((r.getPh() >= 5.5 && r.getPh() < 6.5) || (r.getPh() > 8.0 && r.getPh() <= 9.0)) {
            quality = "Moderate";
            remarks = "Warning: pH is slightly unstable";
        } else if (r.getTurbidity() > 5) {
            quality = "Moderate";
            remarks = "Warning: Water is slightly turbid";
        } else if (r.getTds() > 500) {
            quality = "Moderate";
            remarks = "Warning: TDS exceeds ideal limit";
        }

        // Save the calculated quality to the database
        r.setQuality(quality);
        repo.save(r);

        return new WaterQualityResponse(quality, remarks);
    }

    @Override
    public String getStatus(Long readingId) {
        WaterReading r = repo.findById(readingId).orElse(null);
        if (r == null)
            return "UNKNOWN";

        // Simplified Logic for Status Badge
        if (r.getPh() < 5.5 || r.getPh() > 9.0 || r.getTurbidity() > 10 || r.getTds() > 1000)
            return "Poor";
        if (r.getPh() < 6.5 || r.getPh() > 8.0 || r.getTurbidity() > 5 || r.getTds() > 500)
            return "Moderate";

        return "Good";
    }

    @Override
    public String getRemarks(Long readingId) {
        WaterQualityResponse response = evaluate(readingId);
        return response.getRemarks();
    }
}