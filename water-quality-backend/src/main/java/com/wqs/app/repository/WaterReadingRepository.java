package com.wqs.app.repository;

import com.wqs.app.entity.WaterReading;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaterReadingRepository extends JpaRepository<WaterReading, Long> {
}
