import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from '@shhrrtnvrtickets/common';

class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

export { OrderCancelledPublisher };
