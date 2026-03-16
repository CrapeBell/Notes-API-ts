import { Router } from "express";
import expressValidator from "express-validator";
const body = expressValidator.body;
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/notesController";
import { protect } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequests";

const router = Router();

// Get all notes for the logged-in user
router.get("/", protect, getNotes);

// Create a new note
router.post(
  "/",
  protect,
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  validateRequest,
  createNote
);

// Update an existing note
router.put(
  "/:id",
  protect,
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("content").optional().notEmpty().withMessage("Content cannot be empty"),
  validateRequest,
  updateNote
);

// Delete a note
router.delete("/:id", protect, deleteNote);

export default router;