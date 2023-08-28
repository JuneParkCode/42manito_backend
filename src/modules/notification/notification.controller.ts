import { Controller } from '@nestjs/common';
import { OnSafeEvent } from '../../common/decorators/OnSafeEvent.decorator';
import { IReservationEventPayload } from '../../common/interfaces/event/reservation/reservationEventPayload.interface';
import { NotificationService } from './notification.service';
import { User } from '@prisma/client';
import { getRequestTemplate } from './templates/reservation/reqeust.template';
import { getCancelTemplate } from './templates/reservation/cancel.template';
import { getAcceptTemplate } from './templates/reservation/accept.template';
import { getMenteeCompletionTemplate } from './templates/reservation/menteeCompletion.template';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @OnSafeEvent('reservation.request')
  async handleReservationRequest(payload: IReservationEventPayload) {
    const { mentor, mentee, reservation } = payload;
    const sendTo: Array<User> = [mentor];
    const content: string = getRequestTemplate(mentee, mentor, reservation.requestMessage);
    const subject: string = '[42manito] 새로운 멘토링 요청이 들어왔습니다.';

    await this.notificationService.notify(sendTo, subject, content);
  }

  @OnSafeEvent('reservation.cancel')
  async handleReservationCancel(payload: IReservationEventPayload) {
    const { mentor, mentee, reservation } = payload;
    const sendTo: Array<User> = [mentor, mentee];
    const content: string = getCancelTemplate(mentee, mentor, reservation);
    const subject: string = '[42manito] 멘토링 요청이 취소되었습니다.';

    await this.notificationService.notify(sendTo, subject, content);
  }

  @OnSafeEvent('reservation.accept')
  async handleReservationAccept(payload: IReservationEventPayload) {
    const { mentor, mentee, reservation } = payload;
    const sendTo: Array<User> = [mentee];
    const content: string = getAcceptTemplate(mentee, mentor);
    const subject: string = '[42manito] 멘토링 요청이 수락되었습니다.';

    await this.notificationService.notify(sendTo, subject, content);
  }

  @OnSafeEvent('reservation.menteeCompletion')
  async handleReservationMenteeCompletion(payload: IReservationEventPayload) {
    const { mentor, mentee, reservation } = payload;
    const sendTo: Array<User> = [mentor];
    const content: string = getMenteeCompletionTemplate(mentee, mentor);
    const subject: string = '[42manito] 멘토링이 완료되었습니다.';

    await this.notificationService.notify(sendTo, subject, content);
  }
}