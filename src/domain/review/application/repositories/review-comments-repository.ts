import { PaginationParams } from '@/core/repositories/pagination-params'
import { ReviewComment } from '../../enterprise/entities/review-comment'

export abstract class ReviewCommentsRepository {
  abstract findById(id: string): Promise<ReviewComment | null>
  abstract findBySlug(slug: string): Promise<ReviewComment | null>
  abstract findManyRecent(params: PaginationParams): Promise<ReviewComment[]>
  abstract create(reviewComment: ReviewComment): Promise<void>
  abstract save(reviewComment: ReviewComment): Promise<void>
  abstract delete(reviewComment: ReviewComment): Promise<void>
}
