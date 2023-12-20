import { InMemoryReviewCommentsRepository } from 'test/repositories/in-memory-review-comments-repository'
import { EditComentOnReviewService } from './edit-comment-on-review'
import { makeReviewComment } from 'test/factories/review-comment-factory'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryReviewsCommentsRepository: InMemoryReviewCommentsRepository
let sut: EditComentOnReviewService

describe('Edit comment on a review', () => {
  beforeEach(() => {
    inMemoryReviewsCommentsRepository = new InMemoryReviewCommentsRepository()
    sut = new EditComentOnReviewService(inMemoryReviewsCommentsRepository)
  })

  it('should be able to edit a comment on a review', async () => {
    const reviewComment = makeReviewComment({ content: 'A new comment' })

    await inMemoryReviewsCommentsRepository.create(reviewComment)

    const result = await sut.execute({
      reviewCommentId: reviewComment.id.toString(),
      content: 'Edited comment',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryReviewsCommentsRepository.items[0].content).toEqual(
      'Edited comment',
    )
  })

  it('should not be able to edit a non-existent comment in a review', async () => {
    const reviewComment = makeReviewComment(
      { content: 'A new comment' },
      new UniqueEntityID('review-comment-1'),
    )

    await inMemoryReviewsCommentsRepository.create(reviewComment)

    const result = await sut.execute({
      reviewCommentId: 'review-comment-2',
      content: 'Edited comment',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
