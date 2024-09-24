package entity

import (
	
	"time"
	"gorm.io/gorm"

)

type Member struct {
	gorm.Model
	
	FirstName string
	LastName string
	Gender string
	Birthday time.Time
	Email string
	Password string
	TotalPoint int
	
	Passenger []Passenger `gorm:"foreignKey:MemberID"`
}