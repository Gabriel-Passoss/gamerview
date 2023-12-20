import { InMemoryReviewsRepository } from 'test/repositories/in-memory-reviews-repository'
import { FetchRecentReviewsByReviewerService } from './fetch-recent-reviews'
import { makeReviewer } from 'test/factories/reviewer-factory'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeReview } from 'test/factories/review-factory'

let inMemoryReviewsRepository: InMemoryReviewsRepository
let sut: FetchRecentReviewsByReviewerService

describe('Fetch recent reviews by reviewer', () => {
  beforeEach(() => {
    inMemoryReviewsRepository = new InMemoryReviewsRepository()
    sut = new FetchRecentReviewsByReviewerService(inMemoryReviewsRepository)
  })

  it('should be able to fetch recent reviews by reviewer', async () => {
    const reviewer = makeReviewer({}, new UniqueEntityID('reviewer-1'))

    await inMemoryReviewsRepository.create(
      makeReview(
        {
          reviewerId: reviewer.id,
          createdAt: new Date(2022, 0, 20),
        },
        new UniqueEntityID('review-1'),
      ),
    )

    await inMemoryReviewsRepository.create(
      makeReview(
        {
          reviewerId: reviewer.id,
          createdAt: new Date(2022, 0, 18),
        },
        new UniqueEntityID('review-2'),
      ),
    )

    await inMemoryReviewsRepository.create(
      makeReview(
        {
          reviewerId: reviewer.id,
          createdAt: new Date(2022, 0, 23),
        },
        new UniqueEntityID('review-3'),
      ),
    )

    const result = await sut.execute({
      reviewerId: reviewer.id.toString(),
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.reviews).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })
})
