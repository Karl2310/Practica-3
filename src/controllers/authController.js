const UsuarioModel = require("../models/usuarioModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registrar = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const usuarioExistente = await UsuarioModel.obtenerPorEmail(email);

    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await UsuarioModel.crearUsuario(
      nombre,
      email,
      passwordHash,
    );

    res.status(201).json({ message: "Usuario creado correctamente", usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Debe enviar el usuario y la clave" });
    }

    const usuario = await UsuarioModel.obtenerPorEmail(email);

    if (!usuario) {
      return res.status(401).json({ message: "Usuario o clave incorrectos" });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      return res.status(401).json({ message: "Usuario o clave incorrectos" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      },
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  registrar,
  login,
};
