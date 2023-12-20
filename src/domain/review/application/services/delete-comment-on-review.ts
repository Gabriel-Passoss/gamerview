import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ReviewCommentsRepository } from '../repositories/review-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedOperation } from './errors/unauthorized-operation'

interface DeleteCommentOnReviewServiceRequest {
  commentReviewId: string
  authorId: string
}

type DeleteCommentOnReviewServiceResponse = Either<
  ResourceNotFoundError | UnauthorizedOperation,
  null
>

@Injectable()
export class DeleteCommentOnReviewService {
  constructor(
    private readonly reviewCommentsRepository: ReviewCommentsRepository,
  ) {}

  async execute({
    commentReviewId,
    authorId,
  }: DeleteCommentOnReviewServiceRequest): Promise<DeleteCommentOnReviewServiceResponse> {
    const reviewComment = await this.reviewCommentsRepository.findById(
      commentReviewId,
    )

    if (!reviewComment) {
      return left(new ResourceNotFoundError())
    }

    if (reviewComment.authorId.toString() !== authorId) {
      return left(new UnauthorizedOperation())
    }

    await this.reviewCommentsRepository.delete(reviewComment)

    return right(null)
  }
}
