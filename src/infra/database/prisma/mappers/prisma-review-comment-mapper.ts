import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ReviewComment as PrismaReviewComment, Prisma } from '@prisma/client'
import { ReviewComment } from '@/domain/review/enterprise/entities/review-comment'

export class PrismaReviewCommentsMapper {
  static toDomain(raw: PrismaReviewComment): ReviewComment {
    return ReviewComment.create(
      {
        reviewId: new UniqueEntityID(raw.reviewId),
        authorId: new UniqueEntityID(raw.authorId),
        content: raw.content,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    reviewComment: ReviewComment,
  ): Prisma.ReviewCommentUncheckedCreateInput {
    return {
      id: reviewComment.id.toString(),
      reviewId: reviewComment.id.toString(),
      authorId: reviewComment.id.toString(),
      content: reviewComment.content,
      createdAt: reviewComment.createdAt,
      updatedAt: reviewComment.updatedAt,
    }
  }
}
