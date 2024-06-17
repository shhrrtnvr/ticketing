import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@shhrrtnvrtickets/common';

class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}

export { ExpirationCompletePublisher };
