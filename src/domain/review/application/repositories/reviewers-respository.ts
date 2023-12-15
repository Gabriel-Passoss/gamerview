import { PaginationParams } from '@/core/repositories/pagination-params'
import { Reviewer, ReviewerProps } from '../../enterprise/entities/reviewer'

export abstract class ReviewersRepository {
  abstract findById(id: string): Promise<Reviewer | null>
  abstract findByNickname(nickname: string): Promise<Reviewer | null>
  abstract findManyByFollowers(params: PaginationParams): Promise<Reviewer[]>
  abstract findManyByFollowing(params: PaginationParams): Promise<Reviewer[]>
  abstract create(reviewer: ReviewerProps): Promise<void>
  abstract save(reviewer: ReviewerProps): Promise<void>
}
