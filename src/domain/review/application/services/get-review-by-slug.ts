import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Review } from '../../enterprise/entities/review'
import { ReviewsRepository } from '../repositories/reviews-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetReviewBySlugServiceRequest {
  slug: string
}

type GetReviewBySlugServiceResponse = Either<
  ResourceNotFoundError,
  {
    review: Review
  }
>

@Injectable()
export class GetReviewBySlugService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async execute({
    slug,
  }: GetReviewBySlugServiceRequest): Promise<GetReviewBySlugServiceResponse> {
    const review = await this.reviewsRepository.findBySlug(slug)

    if (!review) {
      return left(new ResourceNotFoundError())
    }

    return right({
      review,
    })
  }
}
