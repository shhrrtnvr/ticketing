import express, { Request, Response } from 'express';
import { requireAuth } from '@shhrrtnvrtickets/common';

const router = express.Router();

router.post('/api/tickets', requireAuth, async (req: Request, res: Response) => {
  res.status(201).json({ message: 'Ticket created successfully' });
})

export { router as createTicketRouter}
