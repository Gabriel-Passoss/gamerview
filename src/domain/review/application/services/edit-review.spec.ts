import { makeReview } from 'test/factories/review-factory'
import { EditReviewService } from './edit-review'
import { InMemoryReviewsRepository } from 'test/repositories/in-memory-reviews-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeReviewer } from 'test/factories/reviewer-factory'

let inMemoryReviewsRepository: InMemoryReviewsRepository
let sut: EditReviewService

describe('Edit a review', () => {
  beforeEach(() => {
    inMemoryReviewsRepository = new InMemoryReviewsRepository()
    sut = new EditReviewService(inMemoryReviewsRepository)
  })

  it('should be able to edit a review', async () => {
    const reviewer = makeReviewer({}, new UniqueEntityID('reviewer-1'))

    const review = makeReview(
      {
        title: 'A new review',
        reviewerId: reviewer.id,
      },
      new UniqueEntityID('review-1'),
    )

    await inMemoryReviewsRepository.create(review)

    const result = await sut.execute({
      reviewId: review.id.toString(),
      reviewerId: reviewer.id.toString(),
      title: 'Edited review',
    })

    expect(result.isRight()).toBe(true)

    expect(result.value).toMatchObject({
      review: expect.objectContaining({
        title: 'Edited review',
      }),
    })
  })
})
