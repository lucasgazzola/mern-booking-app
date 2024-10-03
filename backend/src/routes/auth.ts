import { Router, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user'
import verifyToken from '../middlewares/auth'

const router = Router()

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
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
)

// GET /api/auth/validate-token
router.get('/validate-token', verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId })
})

router.post('/logout', (req: Request, res: Response) => {
  res.cookie('auth_token', '', { expires: new Date(0) })
  res.status(200).send({ message: 'Logged out successfully' })
})

export default router
