import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import * as upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createShow, getFrontShows, getAllShows, editShow } from '../controllers/shows.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload.imageUpload, createShow)
router.get('/', getFrontShows)
router.get('/all', jwt, admin, getAllShows)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload.imageUpload, editShow)

export default router
