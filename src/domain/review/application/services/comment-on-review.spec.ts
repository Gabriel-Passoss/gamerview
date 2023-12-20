import { InMemoryReviewCommentsRepository } from 'test/repositories/in-memory-review-comments-repository'
import { InMemoryReviewsRepository } from 'test/repositories/in-memory-reviews-repository'
import { CommentOnReviewService } from './comment-on-review'
import { makeReview } from 'test/factories/review-factory'

let inMemoryReviewsRepository: InMemoryReviewsRepository
let inMemoryReviewsCommentsRepository: InMemoryReviewCommentsRepository
let sut: CommentOnReviewService

describe('Comment on a review', () => {
  beforeEach(() => {
    inMemoryReviewsRepository = new InMemoryReviewsRepository()
    inMemoryReviewsCommentsRepository = new InMemoryReviewCommentsRepository()
    sut = new CommentOnReviewService(
      inMemoryReviewsCommentsRepository,
      inMemoryReviewsRepository,
    )
  })

  it('should be able to comment on a review', async () => {
    const review = makeReview()

    await inMemoryReviewsRepository.create(review)

    const result = await sut.execute({
      reviewId: review.id.toString(),
      authorId: review.reviewerId.toString(),
      content: 'Comment to test',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryReviewsCommentsRepository.items[0].content).toEqual(
      'Comment to test',
    )
  })
})
