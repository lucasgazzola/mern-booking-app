import express, { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user'
import verifyToken from '../middlewares/auth'

const router = express.Router()

// POST /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Email is requied').isEmail(),
    check('password', 'Password with 6 or more characters required').isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() })
      return
    }

    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })
      if (!user) {
        res.status(400).json({ message: 'User does not exist' })
        return
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        res.status(400).json({ message: 'Invalid credentials' })
        return
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '1d' }
      )

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 864000000,
      })

      res.status(200).json({ userId: user.id })
      return
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
      return
    }
  }
)

// GET /api/auth/validate-token
router.get('/validate-token', verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId })
  return
})

router.post('/logout', (req: Request, res: Response) => {
  res.cookie('auth_token', '', { expires: new Date(0) })
  res.status(200).send({ message: 'Logged out successfully' })
  return
})

export default router
