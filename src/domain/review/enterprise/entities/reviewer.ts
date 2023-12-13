import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Game } from './game'

export interface ReviewerProps {
  name: string
  email: string
  nickname: string
  profileImageUrl: string
  birthday: Date
  subtitle: string
  playing: Game[]
  createdAt: Date
  updatedAt: Date
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

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: ReviewerProps, id?: UniqueEntityID) {
    const reviewer = new Reviewer(props, id)

    return reviewer
  }
}
