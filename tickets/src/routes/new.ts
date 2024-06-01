import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { requireAuth } from '@shhrrtnvrtickets/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post('/api/tickets', 
requireAuth,
[
  body('title')
  .not()
  .isEmpty()
  .withMessage('Title is required'),
  body('price')
  .isFloat({ gt: 0 })
  .withMessage('Price must be greater than 0'),
],
async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { title, price } = req.body

  const ticket = Ticket.build({
    title,
    price,
    userId: req.currentUser!.id
  })
  await ticket.save()

  res.status(201).json({ message: 'Ticket created successfully' })
})

export { router as createTicketRouter}
