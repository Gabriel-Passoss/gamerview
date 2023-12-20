import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Game } from '@/domain/review/enterprise/entities/game'

export function makeGame(override: Partial<Game> = {}, id?: UniqueEntityID) {
  const game = Game.create(
    {
      title: faker.lorem.sentence(),
      bannerUrl: faker.lorem.sentence(),
      description: faker.lorem.paragraphs(3),
      publisher: faker.company.name(),
      releaseDate: faker.date.anytime(),
      studio: faker.company.name(),
      ...override,
    },
    id,
  )

  return game
}
