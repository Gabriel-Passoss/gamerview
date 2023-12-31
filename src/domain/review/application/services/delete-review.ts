import { Either, left, right } from '@/core/either'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ReviewsRepository } from '../repositories/reviews-repository'

interface DeleteReviewServiceRequest {
  reviewId: string
  reviewerId: string
}

type DeleteReviewServiceResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteReviewService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async execute({
    reviewId,
    reviewerId,
  }: DeleteReviewServiceRequest): Promise<DeleteReviewServiceResponse> {
    const reviewToDelete = await this.reviewsRepository.findById(reviewId)

    if (!reviewToDelete) {
      return left(new ResourceNotFoundError())
    }
    if (reviewToDelete.reviewerId.toString() !== reviewerId) {
      return left(new UnauthorizedException())
    }

    await this.reviewsRepository.delete(reviewToDelete)

    return right(null)
  }
}
