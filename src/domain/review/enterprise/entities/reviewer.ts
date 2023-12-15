import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Game } from './game'
import { Optional } from '@/core/types/optional'

export interface ReviewerProps {
  name: string
  email: string
  password: string
  nickname: string
  profileImageUrl: string
  birthday: Date
  subtitle: string
  playing: Game[]
  createdAt: Date
  updatedAt?: Date | null
}

export class Reviewer extends Entity<ReviewerProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name

    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email

    this.touch()
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
    this.touch()
  }

  get nickname() {
    return this.props.nickname
  }

  set nickname(nickname: string) {
    this.props.nickname = nickname

    this.touch()
  }

  get profileImageUrl() {
    return this.props.profileImageUrl
  }

  set profileImageUrl(url: string) {
    this.props.profileImageUrl = url

    this.touch()
  }

  get birthday() {
    return this.props.birthday
  }

  get subtitle() {
    return this.props.subtitle
  }

  set subtitle(subtitle: string) {
    this.props.subtitle = subtitle

    this.touch()
  }

  get playing() {
    return this.props.playing
  }

  set playing(games: Game[]) {
    this.props.playing = games
    this.touch()
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<
      ReviewerProps,
      'profileImageUrl' | 'subtitle' | 'playing' | 'createdAt' | 'updatedAt'
    >,
    id?: UniqueEntityID,
  ) {
    const reviewer = new Reviewer(
      {
        ...props,
        profileImageUrl: props.profileImageUrl ?? '',
        subtitle: props.subtitle ?? '',
        playing: props.playing ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return reviewer
  }
}
