//Fake database

const users = [
  {
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin",
    password: "1234",
  },
];

class UserRepository {
  async findAll() {
    return users;
  }

  async findByEmail(email) {
    return users.find((user) => user.email === email);
  }

  async create(userData) {
    const newUser = {
      ...userData,
    };
    users.push(newUser);
    return newUser;
  }

  async update(email, userData) {
    const index = users.findIndex((user) => user.email === email);
    if (index === -1) return null;

    users[index] = {
      ...users[index],
      ...userData,
    };

    return users[index];
  }

  async updatePartial(email, userData) {
    const index = users.findIndex((user) => user.email === email);
    if (index === -1) return null;

    console.log(userData);

    // Atualiza apenas os campos fornecidos em userData
    Object.keys(userData).forEach((key) => {
      if (userData[key] !== undefined) {
        users[index][key] = userData[key];
      }
    });

    return users[index];
  }

  async delete(email) {
    const index = users.findIndex((user) => user.email === email);
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
  }
}

module.exports = new UserRepository();
