import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DatabaseModule } from '@/infra/database/database.module'
import { ReviewerFactory } from 'test/factories/reviewer-factory'
import { GameFactory } from 'test/factories/game-factory'
import { JwtService } from '@nestjs/jwt'

describe('Create review (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let reviewerFactory: ReviewerFactory
  let gameFactory: GameFactory
  let jwt: JwtService
  let accessToken: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ReviewerFactory, GameFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    reviewerFactory = moduleRef.get(ReviewerFactory)
    gameFactory = moduleRef.get(GameFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('Should be able to create a review', async () => {
    const reviewer = await reviewerFactory.makePrismaReviewer()
    const game = await gameFactory.makePrismaGame()

    accessToken = jwt.sign({ sub: reviewer.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/reviews')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        reviewerId: reviewer.id.toString(),
        gameId: game.id.toString(),
        title: 'A new review',
        hoursOfGameplay: 5,
        isCompleted: false,
        content: 'Content of a new review',
        rate: 4,
      })

    const reviewOnDatabase = await prisma.review.findMany()

    expect(response.statusCode).toBe(201)
    expect(reviewOnDatabase.length).toEqual(1)
  })
})
