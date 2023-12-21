import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'

export interface ReviewProps {
  reviewerId: UniqueEntityID
  gameId: UniqueEntityID
  title: string
  hoursOfGameplay: number
  isCompleted: boolean
  content: string
  slug: Slug
  rate: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Review extends Entity<ReviewProps> {
  private touch() {
    this.props.updatedAt = new Date()
  }

  get reviewerId() {
    return this.props.reviewerId
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)

    this.touch()
  }

  get hoursOfGameplay() {
    return this.props.hoursOfGameplay
  }

  set hoursOfGameplay(hours: number) {
    this.props.hoursOfGameplay = hours
  }

  get isCompleted() {
    return this.props.isCompleted
  }

  set isCompleted(value: boolean) {
    this.props.isCompleted = value
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
  }

  get slug() {
    return this.props.slug
  }

  get rate() {
    return this.props.rate
  }

  set rate(rate: number) {
    if (rate > 5) {
      throw new Error('Invalid rate value')
    }

    this.props.rate = rate
  }

  get gameId() {
    return this.props.gameId
  }

  set gameId(gameId: UniqueEntityID) {
    this.props.gameId = gameId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<ReviewProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    if (props.rate > 5) {
      throw new Error('Invalid rate value')
    }

    const review = new Review(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return review
  }
}
