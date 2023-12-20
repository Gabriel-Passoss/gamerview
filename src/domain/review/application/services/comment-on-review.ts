import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ReviewsRepository } from '../repositories/reviews-repository'
import { ReviewCommentsRepository } from '../repositories/review-comments-repository'
import { ReviewComment } from '../../enterprise/entities/review-comment'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CommentOnReviewServiceRequest {
  reviewId: string
  authorId: string
  content: string
}

type CommentOnReviewServiceResponse = Either<
  ResourceNotFoundError,
  {
    reviewComment: ReviewComment
  }
>

@Injectable()
export class CommentOnReviewService {
  constructor(
    private readonly reviewCommentsRepository: ReviewCommentsRepository,
    private readonly reviewsRepository: ReviewsRepository,
  ) {}

  async execute({
    reviewId,
    authorId,
    content,
  }: CommentOnReviewServiceRequest): Promise<CommentOnReviewServiceResponse> {
    const review = this.reviewsRepository.findById(reviewId)

    if (!review) {
      return left(new ResourceNotFoundError())
    }

    const reviewComment = ReviewComment.create({
      reviewId: new UniqueEntityID(reviewId),
      authorId: new UniqueEntityID(authorId),
      content,
    })

    await this.reviewCommentsRepository.create(reviewComment)

    return right({
      reviewComment,
    })
  }
}
