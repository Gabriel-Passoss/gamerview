import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Review } from '../../enterprise/entities/review'
import { ReviewsRepository } from '../repositories/reviews-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetReviewByIdServiceRequest {
  id: string
}

type GetReviewByIdServiceResponse = Either<
  ResourceNotFoundError,
  {
    review: Review
  }
>

@Injectable()
export class GetReviewByIdService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async execute({
    id,
  }: GetReviewByIdServiceRequest): Promise<GetReviewByIdServiceResponse> {
    const review = await this.reviewsRepository.findById(id)

    if (!review) {
      return left(new ResourceNotFoundError())
    }

    return right({
      review,
    })
  }
}
