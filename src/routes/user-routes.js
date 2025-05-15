const { Router } = require("express");
const UserController = require("../controllers/user-controller");
const validateSchema = require("../middlewares/validation-middleware");
const {
  createUserSchema,
  updateUserSchema,
} = require("../schemas/user-schema");
const authMiddleware = require("../middlewares/auth-middleware");

const userRoutes = Router();

// Rotas de usuários
userRoutes.get("/", authMiddleware, UserController.index);
userRoutes.post("/", validateSchema(createUserSchema), UserController.store);
userRoutes.put(
  "/",
  authMiddleware,
  validateSchema(updateUserSchema),
  UserController.update
);
userRoutes.delete("/", authMiddleware, UserController.delete);
userRoutes.patch(
  "/",
  authMiddleware,
  validateSchema(updateUserSchema),
  UserController.updatePartial
);

module.exports = userRoutes;
