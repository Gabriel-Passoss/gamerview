import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ReviewComment } from '../../enterprise/entities/review-comment'
import { ReviewCommentsRepository } from '../repositories/review-comments-repository'

interface GetReviewCommentByIdServiceRequest {
  reviewCommentId: string
}

type GetReviewCommentByIdServiceResponse = Either<
  ResourceNotFoundError,
  {
    reviewComment: ReviewComment
  }
>

@Injectable()
export class GetReviewCommentByIdService {
  constructor(
    private readonly reviewCommentsRepository: ReviewCommentsRepository,
  ) {}

  async execute({
    reviewCommentId,
  }: GetReviewCommentByIdServiceRequest): Promise<GetReviewCommentByIdServiceResponse> {
    const reviewComment = await this.reviewCommentsRepository.findById(
      reviewCommentId,
    )

    if (!reviewComment) {
      return left(new ResourceNotFoundError())
    }

    return right({
      reviewComment,
    })
  }
}
