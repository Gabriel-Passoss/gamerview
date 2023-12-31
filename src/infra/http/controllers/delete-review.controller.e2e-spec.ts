import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ReviewerFactory } from 'test/factories/reviewer-factory'
import { DatabaseModule } from '@/infra/database/database.module'
import { JwtService } from '@nestjs/jwt'
import { ReviewFactory } from 'test/factories/review-factory'
import { GameFactory } from 'test/factories/game-factory'

describe('Delete a review (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let reviewerFactory: ReviewerFactory
  let reviewFactory: ReviewFactory
  let gameFactory: GameFactory
  let jwt: JwtService
  let accessToken: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ReviewerFactory, ReviewFactory, GameFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    reviewerFactory = moduleRef.get(ReviewerFactory)
    reviewFactory = moduleRef.get(ReviewFactory)
    gameFactory = moduleRef.get(GameFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('should be able to delete a reviewer account', async () => {
    const reviewer = await reviewerFactory.makePrismaReviewer()
    const game = await gameFactory.makePrismaGame()
    const review = await reviewFactory.makePrismaReview({
      gameId: game.id,
      reviewerId: reviewer.id,
    })

    const reviewId = review.id.toString()

    accessToken = jwt.sign({ sub: reviewer.id.toString() })

    const response = await request(app.getHttpServer())
      .delete(`/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)

    const reviewerOnDatabase = await prisma.review.findMany()

    expect(reviewerOnDatabase.length).toEqual(0)
  })
})
