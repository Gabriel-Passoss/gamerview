import { FakeHasher } from 'test/crypto/fake-hasher'
import { InMemoryReviewersRepository } from 'test/repositories/in-memory-reviewers-repository'
import { AuthenticateReviewerService } from './authenticate-reviewer'
import { FakeEncrypter } from 'test/crypto/fake-encrypter'
import { makeReviewer } from 'test/factories/reviewer-factory'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let inMemoryReviewersRepository: InMemoryReviewersRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateReviewerService

describe('Authenticate reviewer', () => {
  beforeEach(() => {
    inMemoryReviewersRepository = new InMemoryReviewersRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateReviewerService(
      inMemoryReviewersRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a reviewer', async () => {
    const reviewer = makeReviewer(
      {
        email: 'jhondoe@example.com',
        password: await fakeHasher.hash('jhondoe'),
      },
      new UniqueEntityID('reviewer-1'),
    )

    await inMemoryReviewersRepository.create(reviewer)

    const result = await sut.execute({
      email: 'jhondoe@example.com',
      password: 'jhondoe',
    })

    expect(result).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate a reviewer with wrong credentials', async () => {
    const reviewer = makeReviewer(
      {
        email: 'jhondoe@example.com',
        password: await fakeHasher.hash('jhondoe'),
      },
      new UniqueEntityID('reviewer-1'),
    )

    await inMemoryReviewersRepository.create(reviewer)

    const result = await sut.execute({
      email: 'jhondoe@example.com',
      password: 'wrongPassword',
    })

    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
