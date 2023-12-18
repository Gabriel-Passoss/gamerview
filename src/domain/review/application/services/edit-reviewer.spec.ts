import { FakeHasher } from 'test/crypto/fake-hasher'
import { InMemoryReviewersRepository } from 'test/repositories/in-memory-reviewers-repository'
import { EditReviewerService } from './edit-reviewer'
import { makeReviewer } from 'test/factories/reviewer-factory'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryReviewersRepository: InMemoryReviewersRepository
let fakeHasher: FakeHasher
let fakeComparer: FakeHasher
let sut: EditReviewerService

describe('Edit reviewer', () => {
  beforeEach(() => {
    inMemoryReviewersRepository = new InMemoryReviewersRepository()
    fakeHasher = new FakeHasher()
    fakeComparer = new FakeHasher()
    sut = new EditReviewerService(
      inMemoryReviewersRepository,
      fakeHasher,
      fakeComparer,
    )
  })

  it('should be able to edit a reviewer', async () => {
    const reviewer = makeReviewer(
      { name: 'Jhon Doe' },
      new UniqueEntityID('reviewer-1'),
    )
    await inMemoryReviewersRepository.create(reviewer)

    const result = await sut.execute({
      reviewerId: reviewer.id.toString(),
      name: 'Edited Reviewer',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryReviewersRepository.items[0]).toMatchObject({
      name: 'Edited Reviewer',
    })
  })

  it('should not be able to edit an password with wrong credential', async () => {
    const reviewer = makeReviewer(
      { password: await fakeHasher.hash('oldPassword') },
      new UniqueEntityID('reviewer-1'),
    )

    await inMemoryReviewersRepository.create(reviewer)

    const result = await sut.execute({
      reviewerId: reviewer.id.toString(),
      password: 'newPassword',
      oldPassword: 'wrongPassword',
    })

    expect(result.isLeft()).toBe(true)
  })
})
