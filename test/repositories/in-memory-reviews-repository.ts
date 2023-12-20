import { PaginationParams } from '@/core/repositories/pagination-params'
import { ReviewsRepository } from '@/domain/review/application/repositories/reviews-repository'
import { Review } from '@/domain/review/enterprise/entities/review'

export class InMemoryReviewsRepository implements ReviewsRepository {
  public items: Review[] = []

  async findById(id: string): Promise<Review | null> {
    const review = this.items.find((item) => item.id.toString() === id)

    if (!review) {
      return null
    }

    return review
  }

  async findBySlug(slug: string): Promise<Review | null> {
    const review = this.items.find((item) => item.slug.value === slug)

    if (!review) {
      return null
    }

    return review
  }

  async findManyByRecent(
    reviewerId: string,
    { page }: PaginationParams,
  ): Promise<Review[]> {
    const reviews = this.items
      .filter((item) => item.reviewerId.toString() === reviewerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return reviews
  }

  async create(review: Review): Promise<void> {
    this.items.push(review)
  }

  async save(review: Review): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === review.id)

    this.items[itemIndex] = review
  }

  async delete(review: Review): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === review.id)

    this.items.splice(itemIndex, 1)
  }
}
