const jwt = require("jsonwebtoken");
const UserService = require("./user-service");

class AuthService {
  static async authenticate(email, password) {
    try {
      const user = await UserService.findUserByEmail(email);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      if (password !== user.password) {
        throw new Error("Senha inválida");
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "secret", // Usando o valor padrão se não estiver definido, mas não é uma boa prática
        { expiresIn: "1d" }
      );

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  static verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error("Token inválido");
    }
  }
}

module.exports = AuthService;
