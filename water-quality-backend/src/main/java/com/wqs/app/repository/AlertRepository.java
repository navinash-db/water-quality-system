package com.wqs.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional; // Import this

import com.wqs.app.entity.Alert;

public interface AlertRepository extends JpaRepository<Alert, Long> {

    List<Alert> findByReadStatusFalse();

    // --- NEW METHOD ---
    // Deletes all alerts linked to a specific WaterReading ID
    @Transactional // Required for delete/update operations in JPA
    void deleteByReadingId(Long readingId);
}