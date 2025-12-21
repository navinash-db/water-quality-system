package com.wqs.app.service.impl;

import org.springframework.stereotype.Service;
import com.wqs.app.dto.WaterQualityResponse;
import com.wqs.app.entity.ThresholdConfig;
import com.wqs.app.entity.WaterReading;
import com.wqs.app.repository.WaterReadingRepository;
import com.wqs.app.service.ConfigService; // Import
import com.wqs.app.service.WaterQualityService;

@Service
public class WaterQualityServiceImpl implements WaterQualityService {

    private final WaterReadingRepository repo;
    private final ConfigService configService; // Inject

    public WaterQualityServiceImpl(WaterReadingRepository repo, ConfigService configService) {
        this.repo = repo;
        this.configService = configService;
    }

    @Override
    public WaterQualityResponse evaluate(Long id) {
        WaterReading r = repo.findById(id).orElse(null);

        if (r == null) {
            return new WaterQualityResponse("UNKNOWN", "Reading not found");
        }

        // Fetch Config
        ThresholdConfig config = configService.getThresholds();
        double phMin = (config != null) ? config.getPhMin() : 6.5;
        double phMax = (config != null) ? config.getPhMax() : 8.5;
        double turbMax = (config != null) ? config.getTurbidityMax() : 5.0;
        double tdsMax = (config != null) ? config.getTdsMax() : 500.0;

        // Derived Criticals
        double phCriticalLow = phMin - 1.0;
        double phCriticalHigh = phMax + 0.5;
        double turbCritical = turbMax * 2;
        double tdsCritical = tdsMax * 2;

        String quality = "Good";
        String remarks = "Water is safe for use";

        // 1. CRITICAL CHECKS (POOR)
        if (r.getPh() < phCriticalLow || r.getPh() > phCriticalHigh) {
            quality = "Poor";
            remarks = "Critical: pH is dangerous (" + r.getPh() + ")";
        } else if (r.getTurbidity() > turbCritical) {
            quality = "Poor";
            remarks = "Critical: Water is very cloudy";
        } else if (r.getTds() > tdsCritical) {
            quality = "Poor";
            remarks = "Critical: High contaminant level";
        }

        // 2. WARNING CHECKS (MODERATE)
        else if ((r.getPh() >= phCriticalLow && r.getPh() < phMin)
                || (r.getPh() > phMax && r.getPh() <= phCriticalHigh)) {
            quality = "Moderate";
            remarks = "Warning: pH is slightly unstable";
        } else if (r.getTurbidity() > turbMax) {
            quality = "Moderate";
            remarks = "Warning: Water is slightly turbid";
        } else if (r.getTds() > tdsMax) {
            quality = "Moderate";
            remarks = "Warning: TDS exceeds ideal limit";
        }

        // Save result
        r.setQuality(quality);
        repo.save(r);

        return new WaterQualityResponse(quality, remarks);
    }

    @Override
    public String getStatus(Long readingId) {
        // You can reuse evaluate() here to ensure logic is identical, or repeat the
        // logic.
        // Reusing evaluate is cleaner:
        WaterQualityResponse response = evaluate(readingId);
        if (response.getQuality().equals("UNKNOWN"))
            return "UNKNOWN";
        return response.getQuality();
    }

    @Override
    public String getRemarks(Long readingId) {
        WaterQualityResponse response = evaluate(readingId);
        return response.getRemarks();
    }
}