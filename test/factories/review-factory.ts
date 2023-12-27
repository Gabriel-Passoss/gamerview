import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Review, ReviewProps } from '@/domain/review/enterprise/entities/review'
import { makeGame } from './game-factory'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaReviewMapper } from '@/infra/database/prisma/mappers/prisma-review-mapper'

export function makeReview(
  override: Partial<Review> = {},
  id?: UniqueEntityID,
) {
  const review = Review.create(
    {
      reviewerId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      gameId: makeGame().id,
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

@Injectable()
export class ReviewFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaReview(data: Partial<ReviewProps> = {}): Promise<Review> {
    const review = makeReview(data)

    await this.prisma.review.create({
      data: PrismaReviewMapper.toPrisma(review),
    })

    return review
  }
}
