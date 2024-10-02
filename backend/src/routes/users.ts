import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'
import User from '../models/user'

const router = express.Router()

// POST /api/users/register
router.post(
  '/register',
  [
    check('firstName', 'First name is required').isString(),
    check('lastName', 'Last name is required').isString(),
    check('email', 'Please include a valid email').isEmail(),
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
    try {
      let user = await User.findOne({ email: req.body.email })

      if (user) {
        res.status(400).json({ message: 'User already exists' })
        return
      }

      user = new User(req.body)
      await user.save()

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '1d' }
      )

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      })

      res.status(200).send({ message: 'User registered OK' })
      return
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
      return
    }
  }
)

export default router
