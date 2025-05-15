const { Router } = require("express");
const AuthController = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const validateSchema = require("../middlewares/validation-middleware");
const { loginSchema } = require("../schemas/auth-schema");

const authRoutes = Router();

// Rota pública de autenticação
authRoutes.post("/login", validateSchema(loginSchema), AuthController.login);

// Rota protegida de exemplo
authRoutes.get("/verify", authMiddleware, (req, res) => {
  return res.json({ message: "Token válido", userId: req.userId });
});

module.exports = authRoutes;
