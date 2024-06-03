import {Publisher, Subjects, TicketUpdatedEvent} from '@shhrrtnvrtickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}
