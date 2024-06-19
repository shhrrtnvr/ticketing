import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  NotAuthorizedError,
  BadRequestError,
  NotFoundError,
} from '@shhrrtnvrtickets/common';
import { Order } from '../models/order';
import { Payment } from '../models/payment';
import { randomBytes } from 'crypto';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === 'cancelled') {
      throw new BadRequestError('Cannot pay for a cancelled order');
    }

    const payment = Payment.build({
      orderId,
      stripeId: randomBytes(4).toString('hex'),
    });

    await payment.save();
    res
      .status(201)
      .send({
        id: payment.id,
        orderId: payment.orderId,
        stripeId: payment.stripeId,
      });

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });
  }
);

export { router as createChargeRouter };
