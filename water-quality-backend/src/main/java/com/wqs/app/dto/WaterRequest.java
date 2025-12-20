package com.wqs.app.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class WaterRequest {

	@DecimalMin(value = "0.0", message = "pH cannot be less than 0")
	@DecimalMax(value = "14.0", message = "pH cannot be more than 14")
	private double ph;

	@DecimalMin(value = "0.0", message = "Turbidity cannot be negative")
	private double turbidity;

	@DecimalMin(value = "0.0", message = "TDS cannot be negative")
	private double tds;

	@NotBlank(message = "Location is required")
	private String location;

	@DecimalMin(value = "-10.0", message = "Temperature is too low")
	@DecimalMax(value = "100.0", message = "Water cannot be hotter than boiling point")
	private double temperature;

	public WaterRequest() {
		super();
	}

	public double getPh() {
		return ph;
	}

	public void setPh(double ph) {
		this.ph = ph;
	}

	public double getTurbidity() {
		return turbidity;
	}

	public void setTurbidity(double turbidity) {
		this.turbidity = turbidity;
	}

	public double getTds() {
		return tds;
	}

	public void setTds(double tds) {
		this.tds = tds;
	}

	public double getTemperature() {
		return temperature;
	}

	public void setTemperature(double temperature) {
		this.temperature = temperature;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}
}