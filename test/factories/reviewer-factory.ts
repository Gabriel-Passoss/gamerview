import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Reviewer,
  ReviewerProps,
} from '@/domain/review/enterprise/entities/reviewer'

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
