package handlers

import (
	"net/http"
	"os"
	"start-app/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
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
	// Buat struct bantuan untuk menangkap input password
	type SignUpInput struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	input := new(SignUpInput)
	if err := c.BodyParser(input); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Format data salah"})
	}
	// Validasi: Username, Email dan Password tidak boleh kosong
	if input.Username == "" || input.Email == "" || input.Password == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Username, email dan password wajib diisi",
		})
	}

	// Hashing Password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Gagal memproses password"})
	}

	user := models.User{
		Username: input.Username,
		Email:    input.Email,
		Password: string(hashedPassword),
	}

	if err := h.DB.Create(&user).Error; err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Gagal menyimpan user"})
	}
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

func (h *UserHandler) Login(c *fiber.Ctx) error {
	type LoginInput struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	input := new(LoginInput)
	if err := c.BodyParser(input); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Format input salah"})
	}

	// 1. Cari user berdasarkan username
	var user models.User
	if err := h.DB.Where("username = ?", input.Username).First(&user).Error; err != nil {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{"error": "Username atau password salah"})
	}

	// 2. Cek Password (Bandingkan hash di DB dengan input)
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))
	if err != nil {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{"error": "Username atau password salah"})
	}

	// 3. Buat JWT Token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id":  user.ID,
		"username": user.Username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // Token berlaku 24 jam
	})

	// 4. Sign token dengan secret dari .env
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Gagal membuat token"})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Login berhasil",
		"token":   tokenString,
		"user": fiber.Map{
			"id":       user.ID,
			"username": user.Username,
		},
	})
}
