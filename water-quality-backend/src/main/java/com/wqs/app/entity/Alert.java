package com.wqs.app.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- NEW FIELD ---
    private Long readingId; // Links this alert to a specific water reading
    // -----------------

    private String message;
    private String location;
    private String quality;

    private boolean readStatus = false;

    private LocalDateTime timestamp = LocalDateTime.now();

    public Alert() {
    }

    public Long getId() {
        return id;
    }

    // --- NEW GETTER & SETTER ---
    public Long getReadingId() {
        return readingId;
    }

    public void setReadingId(Long readingId) {
        this.readingId = readingId;
    }
    // ---------------------------

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getQuality() {
        return quality;
    }

    public void setQuality(String quality) {
        this.quality = quality;
    }

    public boolean isReadStatus() {
        return readStatus;
    }

    public void setReadStatus(boolean readStatus) {
        this.readStatus = readStatus;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}