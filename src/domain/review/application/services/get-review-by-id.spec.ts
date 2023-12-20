import { makeReview } from 'test/factories/review-factory'
import { InMemoryReviewsRepository } from 'test/repositories/in-memory-reviews-repository'
import { GetReviewByIdService } from './get-review-by-id'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryReviewsRepository: InMemoryReviewsRepository
let sut: GetReviewByIdService

describe('Get a review by id', () => {
  beforeEach(() => {
    inMemoryReviewsRepository = new InMemoryReviewsRepository()

    sut = new GetReviewByIdService(inMemoryReviewsRepository)
  })

  it('should be able to get a review by id', async () => {
    const review = makeReview({}, new UniqueEntityID('review-1'))

    await inMemoryReviewsRepository.create(review)

    const result = await sut.execute({
      id: 'review-1',
    })

    expect(result.isRight()).toBe(true)

    expect(result.value).toMatchObject({
      review: expect.objectContaining({
        title: review.title,
      }),
    })
  })
})
