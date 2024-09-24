package entity

import (

	"gorm.io/gorm"

)

type Baggage struct {
	gorm.Model
	
	Weight int
	Price  float64
	Status string
	
	BookingBaggage []BookingBaggage `gorm:"foreignKey:BaggageID"`
}