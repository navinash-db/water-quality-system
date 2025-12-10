package com.wqs.app.dto;

import lombok.Data;

@Data
public class WaterRequest {
    private double ph;
    private double turbidity;
    private double tds;
    private double temperature;
	public WaterRequest() {
		super();
		// TODO Auto-generated constructor stub
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
    
}
