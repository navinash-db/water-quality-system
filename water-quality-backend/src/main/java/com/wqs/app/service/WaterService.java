package com.wqs.app.service;

import java.util.List;

import com.wqs.app.dto.WaterRequest;
import com.wqs.app.entity.WaterReading;

public interface WaterService {
    WaterReading addReading(WaterRequest request);
    public List<WaterReading> getAll();
}
