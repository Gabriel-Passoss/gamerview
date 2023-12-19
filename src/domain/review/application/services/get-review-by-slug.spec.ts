import { makeReview } from 'test/factories/review-factory'
import { GetReviewBySlugService } from './get-review-by-slug'
import { InMemoryReviewsRepository } from 'test/repositories/in-memory-reviews-repository'

let inMemoryReviewsRepository: InMemoryReviewsRepository
let sut: GetReviewBySlugService

describe('Get a review by slug', () => {
  beforeEach(() => {
    inMemoryReviewsRepository = new InMemoryReviewsRepository()

    sut = new GetReviewBySlugService(inMemoryReviewsRepository)
  })

  it('should be able to get a review by slug', async () => {
    const review = makeReview({
      title: 'A new review',
    })

    await inMemoryReviewsRepository.create(review)

    const result = await sut.execute({
      slug: 'a-new-review',
    })

    expect(result.isRight()).toBe(true)

    expect(result.value).toMatchObject({
      review: expect.objectContaining({
        title: review.title,
      }),
    })
  })
})
