import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Reviewer as PrismaReviewer, Prisma } from '@prisma/client'
import { Reviewer } from '@/domain/review/enterprise/entities/reviewer'

export class PrismaReviewerMapper {
  static toDomain(raw: PrismaReviewer): Reviewer {
    return Reviewer.create(
      {
        email: raw.email,
        password: raw.password,
        name: raw.name,
        nickname: raw.nickname,
        birthday: raw.birthDay,
        subtitle: raw.subtitle,
        profileImageUrl: raw.profileImageUrl ?? '',
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(reviewer: Reviewer): Prisma.ReviewerUncheckedCreateInput {
    return {
      id: reviewer.id.toString(),
      email: reviewer.email,
      password: reviewer.password,
      name: reviewer.name,
      nickname: reviewer.nickname,
      birthDay: reviewer.birthday,
      subtitle: reviewer.subtitle,
      profileImageUrl: reviewer.profileImageUrl,
      createdAt: reviewer.createdAt,
      updatedAt: reviewer.updatedAt,
    }
  }
}
