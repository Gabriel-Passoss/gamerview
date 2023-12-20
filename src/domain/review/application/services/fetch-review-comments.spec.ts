import { InMemoryReviewCommentsRepository } from 'test/repositories/in-memory-review-comments-repository'
import { FetchReviewCommentsService } from './fetch-review-comments'
import { makeReviewComment } from 'test/factories/review-comment-factory'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryReviewsCommentsRepository: InMemoryReviewCommentsRepository
let sut: FetchReviewCommentsService

describe('Fetch review comments', () => {
  beforeEach(() => {
    inMemoryReviewsCommentsRepository = new InMemoryReviewCommentsRepository()
    sut = new FetchReviewCommentsService(inMemoryReviewsCommentsRepository)
  })

  it('should be able to fetch comments on a review by reviewId', async () => {
    await inMemoryReviewsCommentsRepository.create(
      makeReviewComment({ reviewId: new UniqueEntityID('review-1') }),
    )

    await inMemoryReviewsCommentsRepository.create(
      makeReviewComment({ reviewId: new UniqueEntityID('review-1') }),
    )

    await inMemoryReviewsCommentsRepository.create(
      makeReviewComment({ reviewId: new UniqueEntityID('review-1') }),
    )

    const result = await sut.execute({
      reviewId: 'review-1',
      page: 1,
    })

    expect(result.value?.reviewComments).toHaveLength(3)
  })
})
