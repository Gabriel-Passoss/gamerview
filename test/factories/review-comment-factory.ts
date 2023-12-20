import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ReviewComment } from '@/domain/review/enterprise/entities/review-comment'

export function makeReviewComment(
  override: Partial<ReviewComment> = {},
  id?: UniqueEntityID,
) {
  const reviewComment = ReviewComment.create(
    {
      authorId: new UniqueEntityID(),
      reviewId: new UniqueEntityID(),
      content: faker.lorem.paragraph(),
      ...override,
    },
    id,
  )

  return reviewComment
}
