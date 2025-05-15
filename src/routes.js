const { Router } = require("express");
const userRoutes = require("./routes/user-routes");
const authRoutes = require("./routes/auth-routes");

const routes = Router();

// Rotas de autenticação
routes.use("/auth", authRoutes);

// Rotas de usuários
routes.use("/user", userRoutes);

module.exports = routes;
