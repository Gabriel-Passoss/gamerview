import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GetReviewCommentByIdService } from './get-review-comment-by-id'
import { InMemoryReviewCommentsRepository } from 'test/repositories/in-memory-review-comments-repository'
import { makeReviewComment } from 'test/factories/review-comment-factory'

let inMemoryReviewCommentsRepository: InMemoryReviewCommentsRepository
let sut: GetReviewCommentByIdService

describe('Get a review comment by id', () => {
  beforeEach(() => {
    inMemoryReviewCommentsRepository = new InMemoryReviewCommentsRepository()
    sut = new GetReviewCommentByIdService(inMemoryReviewCommentsRepository)
  })

  it('should be able to get a review comment by id', async () => {
    const reviewComment = makeReviewComment(
      {},
      new UniqueEntityID('review-comment-1'),
    )

    await inMemoryReviewCommentsRepository.create(reviewComment)

    const result = await sut.execute({
      reviewCommentId: 'review-comment-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      reviewComment: expect.objectContaining({
        content: reviewComment.content,
      }),
    })
  })
})
