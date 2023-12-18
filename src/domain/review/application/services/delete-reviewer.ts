import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ReviewersRepository } from '../repositories/reviewers-respository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteReviewerServiceRequest {
  reviewerId: string
}

type DeleteReviewerServiceResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteReviewerService {
  constructor(private readonly reviewersRepository: ReviewersRepository) {}

  async execute({
    reviewerId,
  }: DeleteReviewerServiceRequest): Promise<DeleteReviewerServiceResponse> {
    const reviewerToDelete = await this.reviewersRepository.findById(reviewerId)

    if (!reviewerToDelete) {
      return left(new ResourceNotFoundError())
    }

    await this.reviewersRepository.delete(reviewerToDelete)

    return right(null)
  }
}
