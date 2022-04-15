import jwt from 'jsonwebtoken'
import HttpError from '../models/http-error.js'

const verifyToken = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    if (!token) {
      throw new Error('Authentication failed.')
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    console.log(decodedToken)
    req.userData = { userId: decodedToken.userId } // q != g
    console.log(req.userData)
    next()
  } catch (err) {
    console.log('Before return in verifytoken')
    return next(new HttpError('Authentication failed error.'))
  }
}


export default verifyToken
