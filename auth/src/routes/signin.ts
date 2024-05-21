import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { Password } from '../services/password'
import { User } from '../models/user'
import { validateRequest } from '../middlewares/validate-requesst'
import { BadRequestError } from '../errors/bad-request-error'

const router = express.Router()

router.post('/api/users/signin',
 [
  body('email')
  .isEmail()
  .withMessage('Email must be valid'),
  body('password')
  .trim()
  .notEmpty()
  .withMessage('You must supply a password')
 ],
 validateRequest,
 async (req: Request, res: Response) => {
  const { email, password } = req.body
  const existing = await User.findOne({ email })

  if (!existing) {
    throw new BadRequestError('Invalid credentials')
  }

  const passwordsMatch = await Password.compare(password, existing.password)

  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials')
  }

  req.session = {
    jwt: jwt.sign({
      id: existing.id,
      email: existing.email
    }, process.env.JWT_KEY!)
  }

  res.send(existing)

})

export { router as signinRouter }
