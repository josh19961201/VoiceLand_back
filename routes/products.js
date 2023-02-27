import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import * as upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createProduct, getAllProducts, getProduct, getSellProducts, editProduct } from '../controllers/products.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload.productUpload, createProduct)
router.get('/', getSellProducts)
router.get('/all', jwt, admin, getAllProducts)
router.get('/:id', getProduct)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload.productUpload, editProduct)

export default router
