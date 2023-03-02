const { check } = require("express-validator");

const validateCreate = [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Por favor introduzca un email valido")
    .normalizeEmail()
    .toLowerCase(),
  check("password")
    .trim()
    .isLength(8)
    .withMessage('La contraseña requiere min 8 caracteres'),
];

module.exports = { validateCreate };
