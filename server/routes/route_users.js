import { Router } from 'express'
import { check } from 'express-validator'

import { getUsers, signUpUser, logInUser, getUsername } from '../controllers/con_users.js'

const usersRouter = Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:uid', getUsername)

usersRouter.post(
  '/signup',
  [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 })
  ],
  signUpUser
)

usersRouter.post('/login', logInUser)

export default usersRouter
