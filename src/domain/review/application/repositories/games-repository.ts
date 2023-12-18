import { PaginationParams } from '@/core/repositories/pagination-params'
import { Game } from '../../enterprise/entities/game'

export abstract class GamesRepository {
  abstract findById(id: string): Promise<Game | null>
  abstract findManyByTitle(
    title: string,
    params: PaginationParams,
  ): Promise<Game[]>

  abstract create(game: Game): Promise<void>
}
