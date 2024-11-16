import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Users } from "../../Models/Users";

const secretKey = crypto.randomBytes(32).toString("hex");
const securityLevel = 10;
const generateToken = (userId: number) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, securityLevel);
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const findUsers = await Users.findAll({ where: { isAdmin: false } });

    if (findUsers) {
      res.status(200).json(findUsers);
    } else {
      res.status(404).json("users not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const findAdmins = await Users.findAll({ where: { isAdmin: true } });

    if (findAdmins) {
      res.status(200).json(findAdmins);
    } else {
      res.status(404).json("admins not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      codArea,
      phoneNumber,
      city,
      country,
      isAdmin,
    } = req.body;

    const userFound = await Users.findOne({ where: { email } });
    if (userFound) {
      res.status(409).json({ message: "This email is already in use" });
    }

    const encryptedPassword = await hashPassword(password);

    const newUser = await Users.create({
      name,
      email,
      password: encryptedPassword,
      codArea,
      phoneNumber,
      city,
      country,
      isAdmin,
    });

    const token = generateToken(Number(newUser.id));
    res.status(201).json({ ...newUser.toJSON, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      codArea,
      phoneNumber,
      city,
      country,
      isAdmin,
    } = req.body;

    // Verificar si el usuario existe
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Encriptar la nueva contraseña si se proporciona
    let updatedPassword = user.password;
    if (password) {
      updatedPassword = await hashPassword(password);
    }

    // Actualizar los datos del usuario
    await user.update({
      name,
      email,
      password: updatedPassword,
      codArea,
      phoneNumber,
      city,
      country,
      isAdmin,
    });

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Users.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
