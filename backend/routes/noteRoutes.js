import express from 'express';
import {
    getNotes,
    searchNotes,
    createNote,
    updateNote,
    deleteNote
} from '../controllers/noteController.js';

const router = express.Router();

router.get('/search', searchNotes);

router.route('/')
    .get(getNotes)
    .post(createNote);

router.route('/:id')
    .put(updateNote)
    .delete(deleteNote);

export default router;
