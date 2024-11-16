import { Request, Response } from "express";
import { Users } from "../../Models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const secretKey = crypto.randomBytes(32).toString("hex");
const generateToken = (userId: number) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "email or password incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password!);
    if (!isPasswordValid) {
      res.status(401).json({ message: "email or password incorrect" });
    }

    const token = generateToken(Number(user?.id));

    return res.status(200).json({
      message: "Start session successfully",
      token,
      email: user?.email,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const loginGoogle = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  //console.log("req.body", req.body);

  try {
    let user = await Users.findOne({ where: { email } });
    if (!user) {
      user = await Users.create({
        name,
        email,
      });
      const token = generateToken(Number(user.id));
      return {
        status: 201,
        data: { ...user.toJSON(), token, email },
      };
    }
    const token = generateToken(Number(user.id));
    res.status(200).json({
      message: "Starting session successfully",
      token,
      email: user.email,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
