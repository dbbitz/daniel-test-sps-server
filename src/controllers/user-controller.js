const UserService = require("../services/user-service");

class UserController {
  async index(req, res) {
    try {
      const { email } = req.query;

      if (email) {
        const user = await UserService.findUserByEmail(email);
        return res.json(user);
      }

      const users = await UserService.listUsers();
      return res.json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.message || "Erro ao listar usuários" });
    }
  }

  async store(req, res) {
    try {
      const user = await UserService.createUser(req.body);

      return res.status(201).json(user);
    } catch (error) {
      if (
        error.message === "Todos os campos são obrigatórios" ||
        error.message === "Email já cadastrado"
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: error.message || "Erro ao criar usuário" });
    }
  }

  async update(req, res) {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({ error: "Parâmetro email é obrigatório" });
      }

      const { name, email: newEmail, password } = req.body;

      if (!name || !newEmail || !password) {
        return res.status(400).json({
          error: "Todos os campos são obrigatórios para atualização completa",
        });
      }

      const user = await UserService.updateUser(email, req.body);
      return res.json(user);
    } catch (error) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "Email já cadastrado") {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: error.message || "Erro ao atualizar usuário" });
    }
  }

  async updatePartial(req, res) {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({ error: "Parâmetro email é obrigatório" });
      }

      const user = await UserService.updatePartialUser(email, req.body);
      return res.json(user);
    } catch (error) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "Email já cadastrado") {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: error.message || "Erro ao atualizar usuário" });
    }
  }

  async delete(req, res) {
    try {
      const { email } = req.query;
      await UserService.deleteUser(email);
      return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: error.message || "Erro ao deletar usuário" });
    }
  }
}

module.exports = new UserController();
