import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@shhrrtnvrtickets/common';

class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

export { OrderCreatedPublisher };
