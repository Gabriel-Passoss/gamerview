import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '@/domain/review/enterprise/entities/value-objects/slug'
import { Game } from '@/domain/review/enterprise/entities/game'
import { Game as PrismaGame, Prisma } from '@prisma/client'

export class PrismaGameMapper {
  static toDomain(raw: PrismaGame): Game {
    return Game.create(
      {
        title: raw.title,
        description: raw.description,
        publisher: raw.publisher,
        studio: raw.studio,
        releaseDate: raw.releaseDate,
        slug: Slug.create(raw.slug),
        bannerUrl: raw.bannerUrl,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(game: Game): Prisma.GameUncheckedCreateInput {
    return {
      id: game.id.toString(),
      title: game.title,
      description: game.description,
      publisher: game.publisher,
      studio: game.studio,
      releaseDate: game.releaseDate,
      slug: game.slug.value,
      bannerUrl: game.bannerUrl,
    }
  }
}
