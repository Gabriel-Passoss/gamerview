import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ReviewCommentsRepository } from '../repositories/review-comments-repository'
import { ReviewComment } from '../../enterprise/entities/review-comment'

interface FetchReviewCommentsServiceRequest {
  reviewId: string
  page: number
}

type FetchReviewCommentsServiceResponse = Either<
  null,
  {
    reviewComments: ReviewComment[]
  }
>

@Injectable()
export class FetchReviewCommentsService {
  constructor(
    private readonly reviewCommentsRepository: ReviewCommentsRepository,
  ) {}

  async execute({
    reviewId,
    page,
  }: FetchReviewCommentsServiceRequest): Promise<FetchReviewCommentsServiceResponse> {
    const reviewComments =
      await this.reviewCommentsRepository.findManyByReviewId(reviewId, { page })

    return right({
      reviewComments,
    })
  }
}
