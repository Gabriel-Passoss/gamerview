import { FakeHasher } from 'test/crypto/fake-hasher'
import { InMemoryReviewersRepository } from 'test/repositories/in-memory-reviewers-repository'
import { RegisterReviewerService } from './register-reviewer'

let inMemoryReviewersRepository: InMemoryReviewersRepository
let fakeHasher: FakeHasher
let sut: RegisterReviewerService

describe('Register reviewer', () => {
  beforeEach(() => {
    inMemoryReviewersRepository = new InMemoryReviewersRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterReviewerService(inMemoryReviewersRepository, fakeHasher)
  })

  it('should be able to register a reviewer', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      nickname: 'jhondoe',
      birthday: new Date(2003, 2, 29),
      password: 'test',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      reviewer: inMemoryReviewersRepository.items[0],
    })
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      nickname: 'jhondoe',
      birthday: new Date(2003, 2, 29),
      password: 'test',
    })

    const hashedPassword = await fakeHasher.hash('test')

    expect(result.isRight()).toBe(true)
    expect(inMemoryReviewersRepository.items[0].password).toEqual(
      hashedPassword,
    )
  })
})
