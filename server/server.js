import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import usersRouter from './routes/route_users.js'
import plansRouter from './routes/route_plans.js'

import HttpError from './models/http-error.js'

const app = express()

app.use(bodyParser.json())
app.use(morgan('combined'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE'
  )
  next()
})

app.use('/api/users', usersRouter)
app.use('/api/plans', plansRouter)

app.use((req, res, next) => {
  throw new HttpError('Could not find this route.', 404)
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }

  res.status(error.code || 500)
  res.json({ message: error.message || 'Unknown error occured' })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`API is running on port ${port}`)
})

export default app
