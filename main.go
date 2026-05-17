package main

import (
	"log"
	"start-app/database"
	"start-app/handlers"
	"start-app/middleware"
	"start-app/models"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/gorm"
)

var DB *gorm.DB

func main() {
	// Inisialisasi Database dari package database
	db := database.InitDB()

	// Menjalankan AutoMigrate untuk membuat tabel otomatis
	err := db.AutoMigrate(&models.User{}, &models.Resource{}, &models.Task{})
	if err != nil {
		log.Fatal("Gagal melakukan migrasi database:", err)
	}

	// Inisialisasi Fiber
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173", // URL Vite
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	api := app.Group("/api")

	// Inisialisasi Handler
	resourceHandler := &handlers.ResourceHandler{DB: db}
	userHandler := &handlers.UserHandler{DB: db}
	taskHandler := &handlers.TaskHandler{DB: db}

	// Rute publik
	api.Post("/users", userHandler.CreateUser)
	api.Post("/users/login", userHandler.Login)

	// Rute terproteksi
	resourceRoutes := api.Group("/resources", middleware.Protected())
	resourceRoutes.Get("/", resourceHandler.GetAllResources)
	resourceRoutes.Post("/", resourceHandler.CreateResource)
	resourceRoutes.Get("/:id", resourceHandler.GetResourceByID)
	resourceRoutes.Delete("/:id", resourceHandler.DeleteResource)

	userRoutes := api.Group("/users", middleware.Protected())
	userRoutes.Get("/", userHandler.GetAllUsers)
	userRoutes.Get("/:id", userHandler.GetUserByID)

	// Task Routes
	taskRoutes := api.Group("/tasks", middleware.Protected())
	taskRoutes.Get("/", taskHandler.GetAllTasks)
	taskRoutes.Get("/history", taskHandler.GetTaskHistory)
	taskRoutes.Post("/", taskHandler.CreateTask)
	taskRoutes.Patch("/:id/complete", taskHandler.CompleteTask)

	// Jalankan Server
	app.Listen(":3000")
}
