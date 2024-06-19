import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@shhrrtnvrtickets/common';

class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}

export { PaymentCreatedPublisher };
