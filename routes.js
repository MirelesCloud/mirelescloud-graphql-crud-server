const express = require('express')

const MovieCtrl = require('./resolvers')

const router = express.Router()

router.post('Movie', MovieCtrl.addMovie)
router.put('/Movie/:id', MovieCrl.updateMovie)
router.delete('/Movie/:id', MovieCrl.deleteMovie)
router.get('Movie/:id', MovieCrl.movie)
router.get('Movies', MovieCrl.movies)

module.exports = router