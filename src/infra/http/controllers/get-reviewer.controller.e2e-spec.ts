import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ReviewerFactory } from 'test/factories/reviewer-factory'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get a reviewer data (E2E)', () => {
  let app: INestApplication
  let reviewerFactory: ReviewerFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ReviewerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    reviewerFactory = moduleRef.get(ReviewerFactory)

    await app.init()
  })

  it('should be able to get a reviewer data', async () => {
    const reviewer = await reviewerFactory.makePrismaReviewer()
    const reviewerId = reviewer.id

    const response = await request(app.getHttpServer()).get(
      `/accounts/${reviewerId}`,
    )

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      reviewer: expect.objectContaining({ id: reviewerId.toString() }),
    })
  })
})
