import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Review } from '../../enterprise/entities/review'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ReviewsRepository } from '../repositories/reviews-repository'

interface CreateReviewServiceRequest {
  reviewerId: string
  title: string
  gameId: string
  hoursOfGameplay: number
  isCompleted: boolean
  content: string
  rate: number
}

type CreateReviewServiceResponse = Either<
  null,
  {
    review: Review
  }
>

@Injectable()
export class CreateReviewService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async execute({
    reviewerId,
    title,
    gameId,
    hoursOfGameplay,
    isCompleted,
    content,
    rate,
  }: CreateReviewServiceRequest): Promise<CreateReviewServiceResponse> {
    const review = Review.create({
      reviewerId: new UniqueEntityID(reviewerId),
      title,
      gameId: new UniqueEntityID(gameId),
      hoursOfGameplay,
      isCompleted,
      content,
      rate,
    })

    await this.reviewsRepository.create(review)

    return right({
      review,
    })
  }
}
