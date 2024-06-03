import {Publisher, Subjects, TicketCreatedEvent} from '@shhrrtnvrtickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
