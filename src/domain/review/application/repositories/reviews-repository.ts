import { PaginationParams } from '@/core/repositories/pagination-params'
import { Review } from '../../enterprise/entities/review'

export abstract class ReviewsRepository {
  abstract findById(id: string): Promise<Review | null>
  abstract findBySlug(slug: string): Promise<Review | null>
  abstract findManyByRecent(
    reviewerId: string,
    params: PaginationParams,
  ): Promise<Review[]>

  abstract create(review: Review): Promise<void>
  abstract save(review: Review): Promise<void>
  abstract delete(review: Review): Promise<void>
}
