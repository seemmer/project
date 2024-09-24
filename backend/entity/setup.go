package entity

import (
	"fmt"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func UintPtr(i uint) *uint {
	return &i
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("G11_PROJECT.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	database.AutoMigrate(
		&Admin{},
		&Airline{},
		&Airport{},
		&Flight{},
		&FlightAndFlightDetails{},
		&FlightDetails{},
		&TypeOfFlight{},
		&Booking{},
		&Passenger{},
		&Baggage{},
		&BookingBaggage{},
		&BookingPassenger{},
		&BookingFlightAndFlightDetails{},
		&Member{},
	)
	db = database

	hashedPassword, _ := HashPassword("admin")
	birthday, _ := time.Parse("2006-01-02", "2003-08-15")
	User := []Admin{
		{
			Email:     "Admin@gmail.com",
			Password:  hashedPassword,
			FirstName: "Salisa",
			LastName:  "Manage",
			Birthday:  birthday,
		},
	}
	for _, pkg := range User {
		db.FirstOrCreate(&pkg, Admin{Email: pkg.Email})
	}

	flightTypes := []TypeOfFlight{
		{TypeFlight: "Departures"},
		{TypeFlight: "Domestic flight"},
	}
	for _, flightT := range flightTypes {
		db.FirstOrCreate(&flightT, TypeOfFlight{TypeFlight: flightT.TypeFlight})
	}

	air_flight := []Airline{
		{AirlineName: "AirAsia"},
		{AirlineName: "Thai Airways"},
		{AirlineName: "Bangkok Airways"},
		{AirlineName: "Thai Lion Air"},
		{AirlineName: "Qantas"},
		{AirlineName: "NokAir"},
		{AirlineName: "Vietjet"},
		{AirlineName: "Lufthansa"},
		{AirlineName: "China Southern Airlines"},
		{AirlineName: "China Eastern Airline"},
		{AirlineName: "Turkish"},
		{AirlineName: "Hainan"},
	}
	for _, airline_flight := range air_flight {
		db.FirstOrCreate(&airline_flight, Airline{AirlineName: airline_flight.AirlineName})
	}

	airports := []Airport{
		{AirportName: "Suvarnabhumi Airport", AirportCode: "BKK"},
		{AirportName: "Don Mueang International Airport", AirportCode: "DMK"},
		{AirportName: "Chiang Mai International Airport", AirportCode: "CNX"},
		{AirportName: "Phuket International Airport", AirportCode: "HKT"},
		{AirportName: "Samui Airport", AirportCode: "USM"},
	}
	for _, airport := range airports {
		db.FirstOrCreate(&airport, Airport{AirportName: airport.AirportName})
	}

	flights := []Flight{
		{FlightDate: time.Date(2023, 9, 10, 0, 0, 0, 0, time.UTC)},
		{FlightDate: time.Date(2023, 10, 5, 0, 0, 0, 0, time.UTC)},
		{FlightDate: time.Date(2023, 11, 20, 0, 0, 0, 0, time.UTC)},
	}
	for _, flight := range flights {
		db.FirstOrCreate(&flight, Flight{FlightDate: flight.FlightDate})
	}

	// Fetch existing data from the database for references
	var airline Airline
	var flyingFrom, goingTo Airport
	var flightType TypeOfFlight

	// Fetching related data
	db.First(&airline, "airline_name = ?", "AirAsia")
	db.First(&flyingFrom, "airport_name = ?", "Suvarnabhumi Airport")
	db.First(&goingTo, "airport_name = ?", "Don Mueang International Airport")
	db.First(&flightType, "type_flight = ?", "Departures")

	// Check if data fetched correctly
	fmt.Println("Airline ID:", airline.ID)
	fmt.Println("Flying From ID:", flyingFrom.ID)
	fmt.Println("Going To ID:", goingTo.ID)
	fmt.Println("Type ID:", flightType.ID)

	// Preparing the FlightDetails data
	Details := []FlightDetails{
		{
			FlightCode:    "FD4113",
			ScheduleStart: time.Date(2023, 9, 10, 8, 30, 0, 0, time.UTC),
			ScheduleEnd:   time.Date(2023, 9, 10, 12, 30, 0, 0, time.UTC),
			Hour:          4,
			Cost:          100,
			Point:         10,
			AirlineID:     UintPtr(1),
			FlyingFromID:  UintPtr(2),
			GoingToID:     UintPtr(3),
			TypeID:        UintPtr(1),
		},
		{
			FlightCode:    "AA102",
			ScheduleStart: time.Date(2023, 10, 5, 9, 45, 0, 0, time.UTC),
			ScheduleEnd:   time.Date(2023, 10, 5, 13, 45, 0, 0, time.UTC),
			Hour:          4,
			Cost:          150,
			Point:         20,
			AirlineID:     UintPtr(3),
			FlyingFromID:  UintPtr(1),
			GoingToID:     UintPtr(4),
			TypeID:        UintPtr(2),
		},
		{
			FlightCode:    "TG202",
			ScheduleStart: time.Date(2023, 12, 15, 11, 15, 0, 0, time.UTC),
			ScheduleEnd:   time.Date(2023, 12, 15, 15, 15, 0, 0, time.UTC),
			Hour:          4,
			Cost:          200,
			Point:         30,
			AirlineID:     UintPtr(6),
			FlyingFromID:  UintPtr(5),
			GoingToID:     UintPtr(3),
			TypeID:        UintPtr(1),
		},
	}

	// Insert or update FlightDetails data
	for _, flightDetail := range Details {
		db.Where(FlightDetails{FlightCode: flightDetail.FlightCode}).
			Assign(flightDetail).FirstOrCreate(&flightDetail)
	}

	// Fetch flight, flight detail, and admin data
	var flight Flight
	var flightDetail FlightDetails
	var admin Admin

	db.First(&flight, "flight_date = ?", time.Date(2023, 9, 10, 0, 0, 0, 0, time.UTC))
	db.First(&flightDetail, "flight_code = ?", "AA102")
	db.First(&admin, "email = ?", "Admin@gmail.com")

	flightAndDetails := []FlightAndFlightDetails{
		{
			// FlightID:       &flight.ID,
			// FlightDetailID: &flightDetail.ID,
			// AdminID:        &admin.ID,
			FlightID:       UintPtr(2),
			FlightDetailID: UintPtr(3),
			AdminID:        UintPtr(1),
		},
	}

	// Insert flight and flight details data
	for _, ffd := range flightAndDetails {
		db.Create(&ffd)
	}

	member := Member{FirstName:"John",LastName:"Doe",
		Gender:      "Male",
		Birthday:    time.Date(1990, time.January, 1, 0, 0, 0, 0, time.UTC),
		Email:       "johndoe@example.com",
		Password:    "password123",
		TotalPoint:  500,
	}
	db.Create(&member)

	passenger := Passenger{
		FirstName:      "Jane",
		LastName:       "Smith",
		Gender:         "Female",
		BirthDay:       time.Date(1995, time.March, 10, 0, 0, 0, 0, time.UTC),
		Email:          "janesmith@example.com",
		Phone:          "1234567890",
		PassportNumber: "X1234567",
		PassportDate:   "2025-01-01",
		MemberID:       &member.ID,
	}
	db.Create(&passenger)

	flightAndFlightDetails := FlightAndFlightDetails{
		FlightID:      &flight.ID,
		FlightDetailID: &flightDetail.ID,
		AdminID:       nil, // Add an Admin ID if you have one
	}
	db.Create(&flightAndFlightDetails)

	booking := Booking{
		BookingDate: time.Now(),
		TotalPrice:  1000.00,
	}
	db.Create(&booking)

	bookingFlightAndFlightDetails := BookingFlightAndFlightDetails{
		BookingID:              &booking.ID,
		FlightAndFlightDetailsID: &flightAndFlightDetails.ID,
		Type:                   "Economy",
	}
	db.Create(&bookingFlightAndFlightDetails)

	// Baggage
	baggage := Baggage{
		Weight: 20,
		Price:  100.00,
		Status: "Checked",
	}
	db.Create(&baggage)

	// Link Booking and Baggage
	bookingBaggage := BookingBaggage{
		BookingID: &booking.ID,
		BaggageID: &baggage.ID,
	}
	db.Create(&bookingBaggage)

	// Link Booking and Passenger
	bookingPassenger := BookingPassenger{
		BookingID:   &booking.ID,
		PassengerID: &passenger.ID,
	}
	db.Create(&bookingPassenger)
}