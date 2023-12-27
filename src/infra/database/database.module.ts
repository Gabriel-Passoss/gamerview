import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ReviewersRepository } from '@/domain/review/application/repositories/reviewers-respository'
import { PrismaReviewersRepository } from './prisma/repositories/prisma-reviewers-repository'
import { ReviewsRepository } from '@/domain/review/application/repositories/reviews-repository'
import { PrismaReviewsRepository } from './prisma/repositories/prisma-reviews-repository'

@Module({
  providers: [
    PrismaService,
    { provide: ReviewersRepository, useClass: PrismaReviewersRepository },
    { provide: ReviewsRepository, useClass: PrismaReviewsRepository },
  ],
  exports: [PrismaService, ReviewersRepository, ReviewsRepository],
})
export class DatabaseModule {}
