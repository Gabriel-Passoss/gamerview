import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ReviewerFactory } from 'test/factories/reviewer-factory'
import { DatabaseModule } from '@/infra/database/database.module'
import { JwtService } from '@nestjs/jwt'

describe('Delete a reviewer account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let reviewerFactory: ReviewerFactory
  let jwt: JwtService
  let accessToken: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ReviewerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    reviewerFactory = moduleRef.get(ReviewerFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('should be able to delete a reviewer account', async () => {
    const reviewer = await reviewerFactory.makePrismaReviewer()
    const reviewerId = reviewer.id

    accessToken = jwt.sign({ sub: reviewer.id.toString() })

    const response = await request(app.getHttpServer())
      .delete(`/accounts/${reviewerId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)

    const reviewerOnDatabase = await prisma.reviewer.findMany()

    expect(reviewerOnDatabase.length).toEqual(0)
  })
})
