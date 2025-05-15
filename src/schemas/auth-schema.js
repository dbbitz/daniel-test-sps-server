const yup = require("yup");

const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória"),
});

module.exports = {
  loginSchema,
};
