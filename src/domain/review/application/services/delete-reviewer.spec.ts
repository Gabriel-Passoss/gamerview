import { InMemoryReviewersRepository } from 'test/repositories/in-memory-reviewers-repository'
import { DeleteReviewerService } from './delete-reviewer'
import { makeReviewer } from 'test/factories/reviewer-factory'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryReviewersRepository: InMemoryReviewersRepository
let sut: DeleteReviewerService

describe('Delete reviewer', () => {
  beforeEach(() => {
    inMemoryReviewersRepository = new InMemoryReviewersRepository()
    sut = new DeleteReviewerService(inMemoryReviewersRepository)
  })

  it('should be able to delete a reviewer', async () => {
    const reviewer = makeReviewer({}, new UniqueEntityID('reviewer-1'))
    await inMemoryReviewersRepository.create(reviewer)

    const result = await sut.execute({
      reviewerId: 'reviewer-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryReviewersRepository.items.length).toEqual(0)
  })
})
