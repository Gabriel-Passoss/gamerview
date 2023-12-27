import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Game, GameProps } from '@/domain/review/enterprise/entities/game'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaGameMapper } from '@/infra/database/prisma/mappers/prisma-game-mapper'

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

@Injectable()
export class GameFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaGame(data: Partial<GameProps> = {}): Promise<Game> {
    const game = makeGame(data)

    await this.prisma.game.create({
      data: PrismaGameMapper.toPrisma(game),
    })

    return game
  }
}
