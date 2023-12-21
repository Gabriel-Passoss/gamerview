import { PaginationParams } from '@/core/repositories/pagination-params'
import { GamesRepository } from '@/domain/review/application/repositories/games-repository'
import { Game } from '@/domain/review/enterprise/entities/game'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaGameMapper } from '../mappers/prisma-game-mapper'

@Injectable()
export class PrismaGamesRepository implements GamesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Game | null> {
    const game = await this.prisma.game.findUnique({
      where: {
        id,
      },
    })

    if (!game) {
      return null
    }

    return PrismaGameMapper.toDomain(game)
  }

  async findManyByTitle(
    title: string,
    { page }: PaginationParams,
  ): Promise<Game[]> {
    const games = await this.prisma.game.findMany({
      where: {
        title,
      },
      orderBy: {
        title: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return games.map(PrismaGameMapper.toDomain)
  }

  async create(game: Game): Promise<void> {
    const data = PrismaGameMapper.toPrisma(game)

    await this.prisma.game.create({
      data,
    })
  }
}
