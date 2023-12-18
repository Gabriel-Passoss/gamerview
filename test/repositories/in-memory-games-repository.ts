import { PaginationParams } from '@/core/repositories/pagination-params'
import { GamesRepository } from '@/domain/review/application/repositories/games-repository'
import { Game } from '@/domain/review/enterprise/entities/game'

export class InMemoryGamesRepository implements GamesRepository {
  public items: Game[] = []

  async findById(id: string): Promise<Game | null> {
    const game = this.items.find((item) => item.id.toString() === id)

    if (!game) {
      return null
    }

    return game
  }

  async findManyByTitle(
    title: string,
    { page }: PaginationParams,
  ): Promise<Game[]> {
    const games = this.items
      .filter((item) => item.title === title)
      .slice((page - 1) * 20, page * 20)

    return games
  }

  async create(game: Game): Promise<void> {
    this.items.push(game)
  }
}
