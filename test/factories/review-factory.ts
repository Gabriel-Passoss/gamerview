import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Review } from '@/domain/review/enterprise/entities/review'
import { makeGame } from './game-factory'

export function makeReview(
  override: Partial<Review> = {},
  id?: UniqueEntityID,
) {
  const review = Review.create(
    {
      reviewerId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      game: makeGame(),
      content: faker.lorem.text(),
      hoursOfGameplay: Math.floor(Math.random() * (200 - 50 + 1)) + 50,
      isCompleted: true,
      rate: Math.floor(Math.random() * 5) + 1,
      ...override,
    },
    id,
  )

  return review
}
