import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import * as upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createWork, getFrontWorks, getAllWorks, editWork } from '../controllers/works.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload.imageUpload, createWork)
router.get('/', getFrontWorks)
router.get('/all', jwt, admin, getAllWorks)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload.imageUpload, editWork)

export default router
