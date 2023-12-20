import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Review } from '../../enterprise/entities/review'
import { ReviewsRepository } from '../repositories/reviews-repository'

interface FetchRecentReviewsByReviewerServiceRequest {
  reviewerId: string
  page: number
}

type FetchRecentReviewsByReviewerServiceResponse = Either<
  null,
  {
    reviews: Review[]
  }
>

@Injectable()
export class FetchRecentReviewsByReviewerService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async execute({
    reviewerId,
    page,
  }: FetchRecentReviewsByReviewerServiceRequest): Promise<FetchRecentReviewsByReviewerServiceResponse> {
    const reviews = await this.reviewsRepository.findManyByRecent(reviewerId, {
      page,
    })

    return right({
      reviews,
    })
  }
}
