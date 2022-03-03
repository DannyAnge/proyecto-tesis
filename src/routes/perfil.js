const express = require('express')
const router = express.Router();
const { render } = require('ejs')

const { guardar, mostrar } = require('../controllers/perfil.controller')

router.post('/perfil/guardar', guardar);
router.get('/perfil/mostrar', mostrar);

module.exports = router;