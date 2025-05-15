const UserRepository = require("../repositories/user-repository");

class UserService {
  async listUsers() {
    return await UserRepository.findAll();
  }

  async findUserByEmail(email) {
    try {
      const user = await UserRepository.findByEmail(email);
      return user;
    } catch (error) {
      throw new Error("Usuário não encontrado");
    }
  }

  async createUser(userData) {
    const { email, name, type, password } = userData;

    if (!email || !name || !type || !password) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const userExists = await UserRepository.findByEmail(email);
    if (userExists) {
      throw new Error("Email já cadastrado");
    }

    return await UserRepository.create({
      email,
      name,
      type,
      password,
    });
  }

  async updateUser(email, userData) {
    const { email: newEmail, name, type, password } = userData;

    const userExists = await UserRepository.findByEmail(email);
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    if (newEmail && newEmail !== userExists.email) {
      const emailExists = await UserRepository.findByEmail(newEmail);
      if (emailExists) {
        throw new Error("Email já cadastrado");
      }
    }
    
    

    return await UserRepository.update(email, {
      email: newEmail,
      name,
      type,
      password,
    });
  }

  async updatePartialUser(email, userData) {
    const { name, type, password } = userData;

    const userExists = await UserRepository.findByEmail(email);
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    const hasNothingToUpdate =
      name === userExists.name &&
      type === userExists.type &&
      password === userExists.password;

    if (hasNothingToUpdate) {
      throw new Error("Nada para atualizar");
    }


    return await UserRepository.updatePartial(email, {
      name,
      type,
      password,
    });
  }

  async deleteUser(email) {
    const userExists = await UserRepository.findByEmail(email);
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    return await UserRepository.delete(email);
  }
}

module.exports = new UserService();
