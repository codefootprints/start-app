package handlers

import (
	"start-app/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type ResourceHandler struct {
	DB *gorm.DB
}

func (h *ResourceHandler) GetAllResources(c *fiber.Ctx) error {
	var resources []models.Resource
	h.DB.Find(&resources)
	return c.Status(200).JSON(resources)
}

func (h *ResourceHandler) CreateResource(c *fiber.Ctx) error {
	resource := new(models.Resource)
	if err := c.BodyParser(resource); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Format data salah",
		})
	}
	h.DB.Create(&resource)
	return c.Status(200).JSON(resource)
}

func (h *ResourceHandler) GetResourceByID(c *fiber.Ctx) error {
	id := c.Params("id")
	var resource models.Resource
	if err := h.DB.First(&resource, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "Resource tidak ditemukan",
		})
	}
	return c.Status(200).JSON(resource)
}

func (h *ResourceHandler) DeleteResource(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := h.DB.Delete(&models.Resource{}, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "Gagal menghapus resource",
		})
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "Resource berhasil dihapus",
	})
}
