import { User } from '@prisma/client';
import { baseMailTemplate } from '../baseMail.template';

/**
 * NOTE: 내부 내용은 추후에 정립할 예정입니다.
 * @description 멘티에게 멘토링 성립을 알리는 메일 템플릿
 * @param mentee
 * @param mentor
 */
export const getAcceptTemplate = (mentee: User, mentor: User) => {
  return baseMailTemplate(
    `
    <p>${mentor.nickname} 님이 ${mentee.nickname} 님의 멘토링 요청을 수락하셨습니다.<br>
    ${mentor.nickname} 님과 멘토링을 시작해보세요!</p>
    <p><a href="https://profile.intra.42.fr/users/${mentor.nickname}">멘토 intra 프로필 조회하기</a></p>
    `,
  );
};
