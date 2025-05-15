const yup = require("yup");

const createUserSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória"),
});

const updateUserSchema = yup.object().shape({
  name: yup.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: yup.string().email("Email inválido"),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
