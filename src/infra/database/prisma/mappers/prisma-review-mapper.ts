import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '@/domain/review/enterprise/entities/value-objects/slug'
import { Review as PrismaReview, Prisma } from '@prisma/client'
import { Review } from '@/domain/review/enterprise/entities/review'

export class PrismaReviewMapper {
  static toDomain(raw: PrismaReview): Review {
    return Review.create(
      {
        reviewerId: new UniqueEntityID(raw.reviewerId),
        gameId: new UniqueEntityID(raw.gameId),
        title: raw.title,
        content: raw.content,
        isCompleted: raw.isCompleted,
        hoursOfGameplay: raw.hoursOfGameplay,
        rate: raw.rate,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(review: Review): Prisma.ReviewUncheckedCreateInput {
    return {
      id: review.id.toString(),
      reviewerId: review.reviewerId.toString(),
      gameId: review.gameId.toString(),
      title: review.title,
      content: review.content,
      isCompleted: review.isCompleted,
      hoursOfGameplay: review.hoursOfGameplay,
      rate: review.rate,
      slug: review.slug.value,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }
  }
}
