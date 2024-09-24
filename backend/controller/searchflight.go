package controller

import (
	"net/http"
	"time"
	"github.com/seemmer/project/entity"
	"github.com/gin-gonic/gin"
)


func GetAvailableFlights(c *gin.Context) {
    // รับค่า query parameters
    departure := c.Query("departure")
    arrival := c.Query("arrival")
    departureDate := c.Query("departure_date")

    // ตรวจสอบว่าวันที่เดินทางถูกส่งมาและแปลงเป็น time.Time
    parsedDate, err := time.Parse("2006-01-02", departureDate)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid departure date format. Use YYYY-MM-DD."})
        return
    }

    var flightAndDetails []entity.FlightAndFlightDetails

    // ค้นหาข้อมูลจาก FlightAndFlightDetails และโหลดข้อมูลที่เกี่ยวข้อง
    err = entity.DB().
    Joins("JOIN flight_details ON flight_and_flight_details.flight_detail_id = flight_details.id"). // Join ตาราง FlightDetails
    Preload("Flight").                        // โหลดข้อมูลเที่ยวบินหลัก
    Preload("FlightDetail").                  // โหลดข้อมูลเที่ยวบินย่อย (FlightDetails)
    Preload("FlightDetail.Airline").          // โหลดข้อมูลสายการบิน
    Preload("FlightDetail.FlyingFrom").       // โหลดข้อมูลสนามบินต้นทาง
    Preload("FlightDetail.GoingTo").          // โหลดข้อมูลสนามบินปลายทาง
    Where("flight_details.schedule_start = ?", parsedDate).
    Where("flight_details.flying_from_id = (SELECT id FROM airports WHERE airport_code = ?)", departure).
    Where("flight_details.going_to_id = (SELECT id FROM airports WHERE airport_code = ?)", arrival).
    Find(&flightAndDetails).Error


    // ตรวจสอบว่ามีข้อผิดพลาดในการค้นหาหรือไม่
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // ตรวจสอบว่ามีเที่ยวบินตรงตามเงื่อนไขหรือไม่
    if len(flightAndDetails) == 0 {
        c.JSON(http.StatusNotFound, gin.H{"message": "No flights found for the given criteria"})
        return
    }

    // ส่งคืนข้อมูลเที่ยวบินพร้อม ID ของ FlightAndFlightDetails เพื่อใช้ในการจอง
    c.JSON(http.StatusOK, flightAndDetails)
}

