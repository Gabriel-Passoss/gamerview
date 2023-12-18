import { PaginationParams } from '@/core/repositories/pagination-params'
import { ReviewCommentsRepository } from '@/domain/review/application/repositories/review-comments-repository'
import { ReviewComment } from '@/domain/review/enterprise/entities/review-comment'

export class InMemoryReviewCommentsRepository
  implements ReviewCommentsRepository
{
  public items: ReviewComment[] = []

  async findById(id: string): Promise<ReviewComment | null> {
    const reviewComment = this.items.find((item) => item.id.toString() === id)

    if (!reviewComment) {
      return null
    }

    return reviewComment
  }

  async findManyByReviewId(
    reviewId: string,
    { page }: PaginationParams,
  ): Promise<ReviewComment[]> {
    const reviewComments = this.items
      .filter((item) => item.reviewId.toString() === reviewId)
      .slice((page - 1) * 20, page * 20)

    return reviewComments
  }

  async create(reviewComment: ReviewComment): Promise<void> {
    this.items.push(reviewComment)
  }

  async save(reviewComment: ReviewComment): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === reviewComment.id,
    )

    this.items[itemIndex] = reviewComment
  }

  async delete(reviewComment: ReviewComment): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === reviewComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
