import { PaginationParams } from '@/core/repositories/pagination-params'
import { ReviewsRepository } from '@/domain/review/application/repositories/reviews-repository'
import { Review } from '@/domain/review/enterprise/entities/review'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaReviewMapper } from '../mappers/prisma-review-mapper'

@Injectable()
export class PrismaReviewsRepository implements ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Review | null> {
    const review = await this.prisma.review.findUnique({
      where: {
        id,
      },
    })

    if (!review) {
      return null
    }

    return PrismaReviewMapper.toDomain(review)
  }

  async findBySlug(slug: string): Promise<Review | null> {
    const review = await this.prisma.review.findUnique({
      where: {
        slug,
      },
    })

    if (!review) {
      return null
    }

    return PrismaReviewMapper.toDomain(review)
  }

  async findManyByRecent(
    reviewerId: string,
    { page }: PaginationParams,
  ): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({
      where: {
        reviewerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: 20,
      take: (page - 1) * 20,
    })

    return reviews.map(PrismaReviewMapper.toDomain)
  }

  async create(review: Review): Promise<void> {
    const data = PrismaReviewMapper.toPrisma(review)

    await this.prisma.review.create({
      data,
    })
  }

  async save(review: Review): Promise<void> {
    const data = PrismaReviewMapper.toPrisma(review)

    await this.prisma.review.update({
      where: {
        id: review.id.toString(),
      },
      data,
    })
  }

  async delete(review: Review): Promise<void> {
    await this.prisma.review.delete({
      where: {
        id: review.id.toString(),
      },
    })
  }
}
