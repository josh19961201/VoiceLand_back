import { Router } from 'express'
import content from '../middleware/content.js'
import { register, login, logout, extend, getUser, editCart, getCart, editUser, editPassword } from '../controllers/users.js'
import * as auth from '../middleware/auth.js'

const router = Router()

router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.delete('/logout', auth.jwt, logout)
router.patch('/extend', auth.jwt, extend)
router.patch('/:id', content('application/json'), auth.jwt, editUser)
router.patch('/password/:id', content('application/json'), auth.jwt, editPassword)
router.get('/me', auth.jwt, getUser)
router.post('/cart', content('application/json'), auth.jwt, editCart)
router.get('/cart', auth.jwt, getCart)

export default router
