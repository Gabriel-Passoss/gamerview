import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ReviewCommentsRepository } from '../repositories/review-comments-repository'
import { ReviewComment } from '../../enterprise/entities/review-comment'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditComentOnReviewServiceRequest {
  reviewCommentId: string
  content: string
}

type EditComentOnReviewServiceResponse = Either<
  ResourceNotFoundError,
  {
    reviewComment: ReviewComment
  }
>

@Injectable()
export class EditComentOnReviewService {
  constructor(
    private readonly reviewCommentsRepository: ReviewCommentsRepository,
  ) {}

  async execute({
    reviewCommentId,
    content,
  }: EditComentOnReviewServiceRequest): Promise<EditComentOnReviewServiceResponse> {
    const reviewComment = await this.reviewCommentsRepository.findById(
      reviewCommentId,
    )

    if (!reviewComment) {
      return left(new ResourceNotFoundError())
    }

    reviewComment.content = content

    await this.reviewCommentsRepository.save(reviewComment)

    return right({
      reviewComment,
    })
  }
}
