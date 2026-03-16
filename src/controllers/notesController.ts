import { Response } from "express";
import Note from "../models/Note";
import { AuthRequest } from "../middleware/authMiddleware";

export const createNote = async (req: AuthRequest, res: Response) => {

 const note = await Note.create({
   title: req.body.title,
   content: req.body.content,
   user: req.user.id
 });

 res.json(note);
};

export const getNotes = async (req: AuthRequest, res: Response) => {

 const notes = await Note.find({
   user: req.user.id
 });

 res.json(notes);
};

export const deleteNote = async (req: AuthRequest, res: Response) => {

 await Note.findByIdAndDelete(req.params.id);

 res.json({ message: "Note deleted" });
};