import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Reviewer } from '../../enterprise/entities/reviewer'
import { ReviewersRepository } from '../repositories/reviewers-respository'

interface GetReviewerByIdServiceRequest {
  reviewerId: string
}

type GetReviewerByIdServiceResponse = Either<
  ResourceNotFoundError,
  {
    reviewer: Reviewer
  }
>

@Injectable()
export class GetReviewerByIdService {
  constructor(private readonly reviewersRepository: ReviewersRepository) {}

  async execute({
    reviewerId,
  }: GetReviewerByIdServiceRequest): Promise<GetReviewerByIdServiceResponse> {
    const reviewer = await this.reviewersRepository.findById(reviewerId)

    if (!reviewer) {
      return left(new ResourceNotFoundError())
    }

    return right({
      reviewer,
    })
  }
}
