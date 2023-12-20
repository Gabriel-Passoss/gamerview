import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ReviewsRepository } from '../repositories/reviews-repository'
import { Review } from '../../enterprise/entities/review'

interface EditReviewServiceRequest {
  reviewId: string
  title?: string
  hoursOfGameplay?: number
  isCompleted?: boolean
  content?: string
  rate?: number
}

type EditReviewServiceResponse = Either<
  ResourceNotFoundError,
  {
    review: Review
  }
>

@Injectable()
export class EditReviewService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async execute({
    reviewId,
    title,
    hoursOfGameplay,
    isCompleted,
    content,
    rate,
  }: EditReviewServiceRequest): Promise<EditReviewServiceResponse> {
    const review = await this.reviewsRepository.findById(reviewId)

    if (!review) {
      return left(new ResourceNotFoundError())
    }

    review.title = title ?? review.title

    review.hoursOfGameplay = hoursOfGameplay ?? review.hoursOfGameplay
    review.isCompleted = isCompleted ?? review.isCompleted
    review.content = content ?? review.content
    review.rate = rate ?? review.rate

    await this.reviewsRepository.save(review)

    return right({
      review,
    })
  }
}
