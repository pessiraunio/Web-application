import { v4 } from 'uuid'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import HttpError from '../models/http-error.js'
import jwt from 'jsonwebtoken'
import {
  getAllUsers,
  addUser,
  getUserRowCountByEmail,
  getUserByEmail,
  getUserById
}
  from '../models/users.js'

const getUsers = async (req, res, next) => {
  const users = await getAllUsers()

  res.json({ users: users })
}

const getUsername = async (req, res, next) => {
  const userId = req.params.uid
  const user = await getUserById(userId)

  if (!user) {
    return next(new HttpError('Could not find a user for the provided id', 404))
  }
  res.json({ user: user.name })
}

const signUpUser = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid values given, check email and name', 422)
    )
  }

  const { name, email, password } = req.body

  const exist = await getUserRowCountByEmail(email)
  if (exist) {
    return next(
      new HttpError('User exists, could not create', 422)
    )
  }
  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 12)
  } catch (err) {
    return next(HttpError('Could not create user, try again', 500))
  }

  const newUser = {
    id: v4(),
    name,
    email,
    password: hashedPassword
  }

  const result = await addUser(newUser)
  if (!result) {
    return next(
      new HttpError('Something went wrong creating the user.', 422)
    )
  }

  let token
  try {
    token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email
      },
      process.env.JWT_KEY, // Not optimal place for secret key!!
      { expiresIn: '1h' }
    )
  } catch (err) {
    return next(new HttpError('Signup failed, please try again', 500))
  }

  res.status(201).json(
    {
      userId: newUser.id,
      email: newUser.email,
      token: token
    }
  )
}

const logInUser = async (req, res, next) => {
  const { email, password } = req.body

  const identifiedUser = await getUserByEmail(email)
  if (!identifiedUser) {
    return next(new HttpError('Could not indetify user, check credentials', 401))
  }

  let isValidPassword = false
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password)
  } catch (err) {
    return next(new HttpError('Could not log in, check credentials', 500))
  }

  if (!isValidPassword) {
    return next(new HttpError('Could not log in, check credentials', 401))
  }

  let token
  try {
    token = jwt.sign(
      {
        userId: identifiedUser.id,
        email: identifiedUser.email
      },
      process.env.JWT_KEY, // Not optimal place for secret key!!
      { expiresIn: '1h' }
    )
  } catch (err) {
    return next(new HttpError('Signup failed, please try again', 500))
  }

  res.status(201).json(
    {
      userId: identifiedUser.id,
      email: identifiedUser.email,
      token: token
    })
}

export {
  getUsers,
  signUpUser,
  logInUser,
  getUsername

}
