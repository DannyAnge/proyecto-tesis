const express = require('express')
const router = express.Router();
const {guardar,editar,actualizar,eliminar,getMarcas} = require('../controllers/marcas.controller')

router.post('/marcas/guardar', guardar)
router.post('/marcas/editar',editar)
router.delete('/marcas/eliminar',eliminar)
router.put('marcas/actualizar',actualizar)
router.post('/marcas/getMarcas',getMarcas)

module.exports = router;