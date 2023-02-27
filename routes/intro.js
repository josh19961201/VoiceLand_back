import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import * as upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { editIntro, getIntro } from '../controllers/intro.js'

const router = Router()

router.get('/', getIntro)
// router.post('/', content('multipart/form-data'), jwt, admin, upload.bannerUpload, createIntro)
router.patch('/', content('multipart/form-data'), jwt, admin, upload.bannerUpload, editIntro)

export default router
