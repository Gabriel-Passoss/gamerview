import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DatabaseModule } from '@/infra/database/database.module'
import { ReviewerFactory } from 'test/factories/reviewer-factory'
import { JwtService } from '@nestjs/jwt'
import { ReviewFactory } from 'test/factories/review-factory'
import { GameFactory } from 'test/factories/game-factory'

describe('Edit review (E2E)', () => {
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
    reviewerFactory = moduleRef.get(ReviewerFactory)
    reviewFactory = moduleRef.get(ReviewFactory)
    gameFactory = moduleRef.get(GameFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('Should be able to edit a review', async () => {
    const reviewer = await reviewerFactory.makePrismaReviewer()
    const game = await gameFactory.makePrismaGame()
    const review = await reviewFactory.makePrismaReview({
      gameId: game.id,
      reviewerId: reviewer.id,
    })

    accessToken = jwt.sign({ sub: reviewer.id.toString() })

    const response = await request(app.getHttpServer())
      .put(`/reviews/${review.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Edited review',
        content: 'Edited review content',
      })

    const reviewOnDatabase = await prisma.review.findUnique({
      where: {
        id: review.id.toString(),
      },
    })

    expect(response.statusCode).toBe(204)
    expect(reviewOnDatabase?.title).toEqual('Edited review')
    expect(reviewOnDatabase?.content).toEqual('Edited review content')
  })
})
