import { Entity } from '@/core/entities/entity'
import { Slug } from './value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface GameProps {
  title: string
  slug: Slug
  description: string
  releaseDate: Date
  publisher: string
  studio: string
}

export class Game extends Entity<GameProps> {
  get title() {
    return this.props.title
  }

  get slug() {
    return this.props.slug
  }

  get description() {
    return this.props.description
  }

  get releaseDate() {
    return this.props.releaseDate
  }

  get publisher() {
    return this.props.publisher
  }

  get studio() {
    return this.props.studio
  }

  static create(props: Optional<GameProps, 'slug'>, id?: UniqueEntityID) {
    const game = new Game(
      { ...props, slug: props.slug ?? Slug.createFromText(props.title) },
      id,
    )

    return game
  }
}
