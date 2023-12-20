import { InMemoryReviewsRepository } from 'test/repositories/in-memory-reviews-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteReviewService } from './delete-review'
import { makeReview } from 'test/factories/review-factory'

let inMemoryReviewsRepository: InMemoryReviewsRepository
let sut: DeleteReviewService

describe('Delete review', () => {
  beforeEach(() => {
    inMemoryReviewsRepository = new InMemoryReviewsRepository()
    sut = new DeleteReviewService(inMemoryReviewsRepository)
  })

  it('should be able to delete a review', async () => {
    const review = makeReview({}, new UniqueEntityID('review-1'))
    await inMemoryReviewsRepository.create(review)

    const result = await sut.execute({
      reviewId: 'review-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryReviewsRepository.items.length).toEqual(0)
  })
})
