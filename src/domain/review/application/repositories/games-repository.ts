import { Game } from '../../enterprise/entities/game'

export abstract class GamesRepository {
  abstract findById(id: string): Promise<Game | null>
  abstract findManyByTitle(title: string): Promise<Game[]>
  abstract create(game: Game): Promise<void>
}
