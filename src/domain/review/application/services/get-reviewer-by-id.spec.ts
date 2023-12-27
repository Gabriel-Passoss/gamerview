import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryReviewersRepository } from 'test/repositories/in-memory-reviewers-repository'
import { GetReviewerByIdService } from './get-reviewer-by-id'
import { makeReviewer } from 'test/factories/reviewer-factory'

let inMemoryReviewersRepository: InMemoryReviewersRepository
let sut: GetReviewerByIdService

describe('Get a reviewer by id', () => {
  beforeEach(() => {
    inMemoryReviewersRepository = new InMemoryReviewersRepository()

    sut = new GetReviewerByIdService(inMemoryReviewersRepository)
  })

  it('should be able to get a reviewer by id', async () => {
    const reviewer = makeReviewer({}, new UniqueEntityID('reviewer-1'))

    await inMemoryReviewersRepository.create(reviewer)

    const result = await sut.execute({
      reviewerId: 'reviewer-1',
    })

    expect(result.isRight()).toBe(true)

    expect(result.value).toMatchObject({
      reviewer: expect.objectContaining({
        _id: expect.objectContaining({
          value: 'reviewer-1',
        }),
      }),
    })
  })
})
