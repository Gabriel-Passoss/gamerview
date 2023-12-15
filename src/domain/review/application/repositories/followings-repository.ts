import { Reviewer } from '../../enterprise/entities/reviewer'

export abstract class FollowingsRepository {
  abstract findManyByReviewer(reviewerId: string): Promise<Reviewer[]>
  abstract findManyByNickname(
    reviewerId: string,
    nickname: string,
  ): Promise<Reviewer[]>
}
