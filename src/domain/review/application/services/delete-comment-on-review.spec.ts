import { InMemoryReviewCommentsRepository } from 'test/repositories/in-memory-review-comments-repository'
import { DeleteCommentOnReviewService } from './delete-comment-on-review'
import { makeReviewComment } from 'test/factories/review-comment-factory'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UnauthorizedOperation } from './errors/unauthorized-operation'

let inMemoryReviewsCommentsRepository: InMemoryReviewCommentsRepository
let sut: DeleteCommentOnReviewService

describe('Delete comment on review', () => {
  beforeEach(() => {
    inMemoryReviewsCommentsRepository = new InMemoryReviewCommentsRepository()
    sut = new DeleteCommentOnReviewService(inMemoryReviewsCommentsRepository)
  })

  it('should be able to delete a comment on a review', async () => {
    const reviewComment = makeReviewComment(
      {
        authorId: new UniqueEntityID('reviewer-1'),
      },
      new UniqueEntityID('review-comment-1'),
    )

    await inMemoryReviewsCommentsRepository.create(reviewComment)

    const result = await sut.execute({
      commentReviewId: 'review-comment-1',
      authorId: 'reviewer-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryReviewsCommentsRepository.items.length).toEqual(0)
  })

  it('should not be able to delete a comment from a review without being the author', async () => {
    const reviewComment = makeReviewComment(
      {
        authorId: new UniqueEntityID('reviewer-1'),
      },
      new UniqueEntityID('review-comment-1'),
    )

    await inMemoryReviewsCommentsRepository.create(reviewComment)

    const result = await sut.execute({
      commentReviewId: 'review-comment-1',
      authorId: 'reviewer-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedOperation)
    expect(inMemoryReviewsCommentsRepository.items.length).toEqual(1)
  })
})
