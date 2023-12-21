import { PaginationParams } from '@/core/repositories/pagination-params'
import { ReviewCommentsRepository } from '@/domain/review/application/repositories/review-comments-repository'
import { ReviewComment } from '@/domain/review/enterprise/entities/review-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaReviewCommentsMapper } from '../mappers/prisma-review-comment-mapper'

@Injectable()
export class PrismaReviewCommentsRepository
  implements ReviewCommentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ReviewComment | null> {
    const reviewComment = await this.prisma.reviewComment.findUnique({
      where: {
        id,
      },
    })

    if (!reviewComment) {
      return null
    }

    return PrismaReviewCommentsMapper.toDomain(reviewComment)
  }

  async findManyByReviewId(
    reviewId: string,
    { page }: PaginationParams,
  ): Promise<ReviewComment[]> {
    const reviewComments = await this.prisma.reviewComment.findMany({
      where: {
        reviewId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return reviewComments.map(PrismaReviewCommentsMapper.toDomain)
  }

  async create(reviewComment: ReviewComment): Promise<void> {
    const data = PrismaReviewCommentsMapper.toPrisma(reviewComment)

    await this.prisma.reviewComment.create({
      data,
    })
  }

  async save(reviewComment: ReviewComment): Promise<void> {
    const data = PrismaReviewCommentsMapper.toPrisma(reviewComment)

    await this.prisma.reviewComment.update({
      where: {
        id: reviewComment.id.toString(),
      },
      data,
    })
  }

  async delete(reviewComment: ReviewComment): Promise<void> {
    await this.prisma.reviewComment.delete({
      where: {
        id: reviewComment.id.toString(),
      },
    })
  }
}
