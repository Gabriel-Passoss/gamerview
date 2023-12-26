import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Reviewer,
  ReviewerProps,
} from '@/domain/review/enterprise/entities/reviewer'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaReviewerMapper } from '@/infra/database/prisma/mappers/prisma-reviewer-mapper'

export function makeReviewer(
  override: Partial<ReviewerProps> = {},
  id?: UniqueEntityID,
) {
  const reviewer = Reviewer.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthday: faker.date.birthdate(),
      nickname: faker.person.middleName(),
      ...override,
    },
    id,
  )

  return reviewer
}

@Injectable()
export class ReviewerFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaReviewer(
    data: Partial<ReviewerProps> = {},
  ): Promise<Reviewer> {
    const reviewer = makeReviewer(data)

    await this.prisma.reviewer.create({
      data: PrismaReviewerMapper.toPrisma(reviewer),
    })

    return reviewer
  }
}
