const express = require('express');
const router = express.Router();
import { addMovie } from "../services/addMovie";
import { listAllMovies } from "../services/listAllMovies";
import { searchMovie } from "../services/searchMovie";
import { updateMovie } from "../services/updateMovie";
import { deleteMovie } from "../services/deleteMovie";

router.post('/', addMovie);
router.get('/', listAllMovies);
router.get('/search', searchMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;