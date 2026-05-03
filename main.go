package main

import (
	"fmt"
	"log"
	"start-app/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func main() {
	// Koneksi database
	dsn := "host=localhost user=user_admin password=password_rahasia dbname=start_db port=5432 sslmode=disable"
	DB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Gagal koneksi ke database:", err)
	}

	fmt.Println("Koneksi ke database berhasil!")

	// Menjalankan AutoMigrate untuk membuat tabel otomatis
	err = DB.AutoMigrate(&models.User{}, &models.Resource{}, &models.Task{})
	if err != nil {
		log.Fatal("Gagal melakukan migrasi database:", err)
	}

	fmt.Println("Migrasi tabel selesai!")

	// Inisialisasi Fiber
	app := fiber.New()

	// Endpoint POST untuk menambah Resource
	app.Post("/api/resources", func(c *fiber.Ctx) error {
		resource := new(models.Resource)
		if err := c.BodyParser(resource); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": "Format data salah",
			})
		}

		DB.Create(&resource)
		return c.Status(201).JSON(resource)
	})

	// Jalankan Server
	app.Listen(":3000")
}
