import express from "express";
import { createNote,deleteNote,getAllNotes,getNoteById,updateNote } from "../controllers/notesController.js";
const router = express.Router(); //express.Router() is a factory function that creates a new, isolated instance of a router. Instead of defining all your routes directly on the main app object (e.g., app.get('/users', ...), app.post('/products', ...)), you can group related routes together within a router. This promotes modularity and makes your codebase more organized and maintainable.


router.get("/",getAllNotes);
router.get("/:id",getNoteById);
router.post("/",createNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);

export default router; //https://dev.to/samyak112/export-vs-export-default-in-js-2fbi
