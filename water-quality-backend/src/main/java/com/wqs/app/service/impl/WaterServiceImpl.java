package com.wqs.app.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wqs.app.dto.WaterRequest;
import com.wqs.app.entity.WaterReading;
import com.wqs.app.repository.WaterReadingRepository;
import com.wqs.app.service.WaterService;

@Service
public class WaterServiceImpl implements WaterService {

    private final WaterReadingRepository repo;

    public WaterServiceImpl(WaterReadingRepository repo) {
        this.repo = repo;
    }

    @Override
    public WaterReading addReading(WaterRequest r) {

        String quality = "Good";

        if (r.getPh() < 6 || r.getPh() > 8) quality = "Poor";
        else if (r.getTurbidity() > 5) quality = "Poor";
        else if (r.getTds() > 500) quality = "Moderate";

        WaterReading reading = new WaterReading();
        reading.setPh(r.getPh());
        reading.setTurbidity(r.getTurbidity());
        reading.setTds(r.getTds());
        reading.setTemperature(r.getTemperature());
        reading.setQuality(quality);

        return repo.save(reading);
    }

    @Override
    public List<WaterReading> getAll() {
        return repo.findAll();
    }

}
