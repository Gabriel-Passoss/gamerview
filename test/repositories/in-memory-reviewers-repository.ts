import { ReviewersRepository } from '@/domain/review/application/repositories/reviewers-respository'
import { Reviewer } from '@/domain/review/enterprise/entities/reviewer'

export class InMemoryReviewersRepository implements ReviewersRepository {
  public items: Reviewer[] = []

  async findById(id: string): Promise<Reviewer | null> {
    const reviewer = this.items.find((item) => item.id.toString() === id)

    if (!reviewer) {
      return null
    }

    return reviewer
  }

  async findByNickname(nickname: string): Promise<Reviewer | null> {
    const reviewer = this.items.find((item) => item.nickname === nickname)

    if (!reviewer) {
      return null
    }

    return reviewer
  }

  async findByEmail(email: string): Promise<Reviewer | null> {
    const reviewer = this.items.find((item) => item.email === email)

    if (!reviewer) {
      return null
    }

    return reviewer
  }

  async create(reviewer: Reviewer): Promise<void> {
    this.items.push(reviewer)
  }

  async save(reviewer: Reviewer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === reviewer.id)

    this.items[itemIndex] = reviewer
  }

  async delete(reviewer: Reviewer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === reviewer.id)

    this.items.splice(itemIndex, 1)
  }
}
