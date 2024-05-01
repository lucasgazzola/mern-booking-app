import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import userRoutes from './routes/users'
import authRoutes from './routes/auth'

const PORT = process.env.PORT ?? 3000

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use(express.static('../frontend/dist'))
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})
