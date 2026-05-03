package handlers

import (
	"net/http"
	"start-app/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type UserHandler struct {
	DB *gorm.DB
}

func (h *UserHandler) GetAllUsers(c *fiber.Ctx) error {
	var users []models.User
	h.DB.Find(&users)
	return c.Status(http.StatusOK).JSON(users)
}

func (h *UserHandler) CreateUser(c *fiber.Ctx) error {
	user := new(models.User)
	if err := c.BodyParser(user); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Format data salah",
		})
	}
	h.DB.Create(&user)
	return c.Status(http.StatusCreated).JSON(user)
}

func (h *UserHandler) GetUserByID(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.User
	if err := h.DB.First(&user, id).Error; err != nil {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{
			"error": "User tidak ditemukan",
		})
	}
	return c.Status(http.StatusOK).JSON(user)
}
