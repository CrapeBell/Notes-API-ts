import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {

 const { email, password } = req.body;

 const hashedPassword = await bcrypt.hash(password, 10);

 const user = await User.create({
   email,
   password: hashedPassword
 });

 res.json(user);
};

export const login = async (req: Request, res: Response) => {

 const { email, password } = req.body;

 const user = await User.findOne({ email });

 if (!user) return res.status(400).json({ message: "Invalid credentials" });

 const isMatch = await bcrypt.compare(password, user.password);

 if (!isMatch)
   return res.status(400).json({ message: "Invalid credentials" });

 const token = jwt.sign(
   { id: user._id },
   process.env.JWT_SECRET as string,
   { expiresIn: "1d" }
 );

 res.json({ token });
};