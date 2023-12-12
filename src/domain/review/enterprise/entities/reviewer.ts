import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface ReviewerProps {
  name: string
  email: string
  nickname: string
  profileImageUrl: string
  birthday: Date
  subtitle: string
}

export class Reviewer extends Entity<ReviewerProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get nickname() {
    return this.props.nickname
  }

  get profileImageUrl() {
    return this.props.profileImageUrl
  }

  get birthday() {
    return this.props.birthday
  }

  get subtitle() {
    return this.props.subtitle
  }

  static create(props: ReviewerProps, id?: UniqueEntityID) {
    const reviewer = new Reviewer(props, id)

    return reviewer
  }
}
