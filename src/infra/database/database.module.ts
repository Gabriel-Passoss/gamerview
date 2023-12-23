import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ReviewersRepository } from '@/domain/review/application/repositories/reviewers-respository'
import { PrismaReviewersRepository } from './prisma/repositories/prisma-reviewers-repository'

@Module({
  providers: [
    PrismaService,
    { provide: ReviewersRepository, useClass: PrismaReviewersRepository },
  ],
  exports: [PrismaService, ReviewersRepository],
})
export class DatabaseModule {}
