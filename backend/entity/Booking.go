package entity

import (
	
	"time"
	"gorm.io/gorm"

)

type Booking struct {
	gorm.Model
	
	BookingDate time.Time `json:"booking_date"`
	TotalPrice  float64   `json:"total_price"`
	
	BookingPassenger []BookingPassenger `gorm:"foreignKey:BookingID"`
	BookingBaggage []BookingBaggage `gorm:"foreignKey:BookingID"`
	BookingFlightAndFlightDetails []BookingFlightAndFlightDetails `gorm:"foreignKey:BookingID"`
}