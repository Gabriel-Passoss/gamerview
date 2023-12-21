import { ReviewersRepository } from '@/domain/review/application/repositories/reviewers-respository'
import { Reviewer } from '@/domain/review/enterprise/entities/reviewer'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaReviewerMapper } from '../mappers/prisma-reviewer-mapper'

@Injectable()
export class PrismaReviewersRepository implements ReviewersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Reviewer | null> {
    const reviewer = await this.prisma.reviewer.findUnique({
      where: {
        id,
      },
    })

    if (!reviewer) {
      return null
    }

    return PrismaReviewerMapper.toDomain(reviewer)
  }

  async findByNickname(nickname: string): Promise<Reviewer | null> {
    const reviewer = await this.prisma.reviewer.findUnique({
      where: {
        nickname,
      },
    })

    if (!reviewer) {
      return null
    }

    return PrismaReviewerMapper.toDomain(reviewer)
  }

  async findByEmail(email: string): Promise<Reviewer | null> {
    const reviewer = await this.prisma.reviewer.findUnique({
      where: {
        email,
      },
    })

    if (!reviewer) {
      return null
    }

    return PrismaReviewerMapper.toDomain(reviewer)
  }

  async create(reviewer: Reviewer): Promise<void> {
    const data = PrismaReviewerMapper.toPrisma(reviewer)

    await this.prisma.reviewer.create({
      data,
    })
  }

  async save(reviewer: Reviewer): Promise<void> {
    const data = PrismaReviewerMapper.toPrisma(reviewer)

    await this.prisma.reviewer.update({
      where: {
        id: reviewer.id.toString(),
      },
      data,
    })
  }

  async delete(reviewer: Reviewer): Promise<void> {
    await this.prisma.reviewer.delete({
      where: {
        id: reviewer.id.toString(),
      },
    })
  }
}
